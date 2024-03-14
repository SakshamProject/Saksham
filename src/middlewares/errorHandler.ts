import {Request, Response, NextFunction} from "express";
import APIError from "../services/errors/APIError.js";

function errorHandler(error: APIError, request: Request, response: Response, next: NextFunction) {
    console.log({"message": error.message, "error": error});
    response.status(error.statusCode).json({"message": error.message, "error": error});
}

export default errorHandler;
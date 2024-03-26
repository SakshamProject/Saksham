import {Request, Response, NextFunction} from "express";
import APIError from "../services/errors/APIError.js";

function errorHandler(error: APIError, request: Request, response: Response, next: NextFunction) {
    response.status(error.statusCode).json({"error": {"message": error.message, "severity": error.severity, "name": error.name}});
}

export default errorHandler;
import { NextFunction, Request, Response } from "express";
import APIError from "../../services/errors/APIError.js";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(StatusCodes.BAD_REQUEST).json(error);
  }
  if (error instanceof APIError) {
    return response.status(error.statusCode).json({
      error: {
        message: error.message,
        severity: error.severity,
        name: error.name,
      },
    });
  }
}
export default errorHandler;

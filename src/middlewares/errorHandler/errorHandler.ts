import { Request, Response, NextFunction } from "express";
import APIError from "../../services/errors/APIError.js";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes"
import log from "../../services/logger/logger.js";

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  log("error", "%o", error);
  if (error instanceof ZodError) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
  if (error instanceof APIError) {
    response
      .status(error.statusCode)
      .json({
        error: {
          message: error.message,
          severity: error.severity,
          name: error.name,
        },
      });
  }
}

export default errorHandler;

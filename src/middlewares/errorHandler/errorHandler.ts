import {NextFunction, Request, Response} from "express";
import APIError from "../../services/errors/APIError.js";
import {ZodError} from "zod";
import {StatusCodes} from "http-status-codes"
import log from "../../services/logger/logger.js";
import multer from "multer";

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

    if (error instanceof multer.MulterError) {
        // Handle Multer-specific errors here
        if (error.code === 'LIMIT_FILE_SIZE') {
            response
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    error: {
                        message: "File is Too Large. Max Size allowed is 5MB",
                        severity: "I",
                        name: "FileSizeLimitExceeded"
                    },
                })
        }
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

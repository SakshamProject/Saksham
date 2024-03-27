import {Prisma} from "@prisma/client";
import APIError from "../../errors/APIError.js";
import {StatusCodes} from "http-status-codes";

function throwDatabaseError(error: Error) {
    if (error instanceof APIError) {
        throw new APIError(
            error.message,
            error.statusCode,
            error.name,
            error.severity
        );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
            throw new APIError(
                "The specified record could not be found",
                StatusCodes.INTERNAL_SERVER_ERROR,
                "DatabaseDeletionError",
                "E"
            );
        }
    } else {
        throw new APIError(
            "Some database error occurred",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "DatabaseError",
            "E"
        );
    }

}

export default throwDatabaseError;
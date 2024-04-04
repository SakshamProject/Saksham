import {Prisma} from "@prisma/client";
import APIError from "../../errors/APIError.js";
import {StatusCodes} from "http-status-codes";

const DatabaseConnectivityError = "P1001";

function throwDatabaseError(error: Error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === DatabaseConnectivityError) {
            throw new APIError(
                "Could not connect to the database",
                StatusCodes.INTERNAL_SERVER_ERROR,
                "DatabaseConnectivityError",
                "S"
            );
        }
        if (error.code === "P2003") {
            throw new APIError(
                `Foreign Key Error on ${error.meta?.field_name}`,
                StatusCodes.INTERNAL_SERVER_ERROR,
                "DatabaseForeignKeyError",
                "E"
            );
        }
        if (error.code === "P2025") {
            throw new APIError(
                "The specified record could not be found",
                StatusCodes.INTERNAL_SERVER_ERROR,
                "DatabaseDeletionError",
                "E"
            );
        }
        if (error.code === "P2002") {
            throw new APIError(
                `Unique constraint failed on: ${error.meta?.name}`,
                StatusCodes.INTERNAL_SERVER_ERROR,
                "DatabaseUniqueConstraintError",
                "E"
            );
        }
    }
    throw new APIError(
        "Some database error occurred",
        StatusCodes.INTERNAL_SERVER_ERROR,
        "DatabaseError",
        "E"
    );
}

export default throwDatabaseError;
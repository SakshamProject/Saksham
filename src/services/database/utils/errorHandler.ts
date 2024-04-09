import { Prisma } from "@prisma/client";
import APIError from "../../errors/APIError.js";
import { StatusCodes } from "http-status-codes";

const PrismaKnownErrors = {
    DatabaseConnectivityError : "P1001",
    RecordNotFound : "P2025",
    UniqueConstraintViolation: "P2002",
    ForeignKeyError: "P2003"
};

function throwDatabaseError(error: Error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw prismaErrors(error);
    }
    throw new APIError(
        "Some database error occurred",
        StatusCodes.INTERNAL_SERVER_ERROR,
        "DatabaseError",
        "E"
    );
}

function prismaErrors(error: Prisma.PrismaClientKnownRequestError) {
    if (error.code === PrismaKnownErrors.RecordNotFound) {
        throw new APIError(
          "The specified record could not be found",
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Database record not found",
          "E"
        );
    }

    if (error.code === PrismaKnownErrors.UniqueConstraintViolation) {
        throw new APIError(
          `Unique contraint violated in column -> ${error.meta?.target}`,
          StatusCodes.BAD_REQUEST,
          "Unique constraint violation",
          "E"
        );
    }

    if (error.code === PrismaKnownErrors.DatabaseConnectivityError) {
        throw new APIError(
            "Could not connect to the database",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "DatabaseConnectivityError",
            "S"
        );
    }
    if (error.code === PrismaKnownErrors.ForeignKeyError) {
        throw new APIError(
            `Foreign Key Error on ${error.meta?.field_name}`,
            StatusCodes.INTERNAL_SERVER_ERROR,
            "DatabaseForeignKeyError",
            "E"
        );
    }
    throw new APIError(
        "Some database error occurred",
        StatusCodes.INTERNAL_SERVER_ERROR,
        "DatabaseError",
        "E"
    );
}

export default throwDatabaseError;
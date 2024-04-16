import { Prisma } from "@prisma/client";
import APIError from "../../errors/APIError.js";
import { StatusCodes } from "http-status-codes";

const PrismaKnownErrors = {
  DatabaseConnectivityError: "P1001",
  RecordNotFound: "P2025",
  UniqueConstraintViolation: "P2002",
  ForeignKeyError: "P2003",
};

function throwDatabaseError(error: Error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw prismaKnownErrors(error);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new APIError(
      "Oh No! Some Unknown Database Error Occurred. Please Try Again.",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "DatabaseUnknownError",
      "E"
    );
  }
  if (error instanceof APIError) return error;

  throw new APIError(
    "Some Database Error Occurred",
    StatusCodes.INTERNAL_SERVER_ERROR,
    "DatabaseError",
    "E"
  );
}

function prismaKnownErrors(error: Prisma.PrismaClientKnownRequestError) {
  if (error.code === PrismaKnownErrors.RecordNotFound) {
    throw new APIError(
      "The Specified Record Could Not Be Found",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "DatabaseRecordNotFound",
      "E"
    );
  }

  if (error.code === PrismaKnownErrors.UniqueConstraintViolation) {
    throw new APIError(
      `Unique Constraint Violated In Column -> ${error.meta?.target}`,
      StatusCodes.BAD_REQUEST,
      "Unique constraint violation",
      "E"
    );
  }

  if (error.code === PrismaKnownErrors.DatabaseConnectivityError) {
    throw new APIError(
      "Could Not Connect To The Database",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "DatabaseConnectivityError",
      "S"
    );
  }
  if (error.code === PrismaKnownErrors.ForeignKeyError) {
    throw new APIError(
      `Foreign Key Error On ${error.meta?.field_name}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "DatabaseForeignKeyError",
      "E"
    );
  }
  throw new APIError(
    "Some Database Error Occurred",
    StatusCodes.INTERNAL_SERVER_ERROR,
    "DatabaseError",
    "E"
  );
}

export default throwDatabaseError;

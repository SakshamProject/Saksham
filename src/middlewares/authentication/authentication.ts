import { NextFunction, Request, Response } from "express";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../../../config.js";
import { verifyDivyang } from "../../services/database/authentication/verifydivyang.js";
import { getUserByIdAuthDB } from "../../services/database/authentication/verifyUser.js";
import { superAdminUserNames } from "../../defaults.js";

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers?.["authorization"];
    if (!token) {
      throw new APIError(
        "Unauthorized",
        StatusCodes.UNAUTHORIZED,
        "UnauthorizationError",
        "S"
      );
    }
    const decodedToken = jwt.verify(token, config.SECRET) as Token;
    request.token = decodedToken;
    console.log("decodedToken", decodedToken);
    console.log("superAdminUSers", superAdminUserNames);
    if (
      superAdminUserNames.some((admin) => admin === decodedToken.superAdmin)
    ) {
      next();
    }
    const userId = decodedToken.userId;
    const user = await getUserByIdAuthDB(userId);
    if (!user) {
      if (decodedToken.personId) {
        const divyang = await verifyDivyang(decodedToken.personId);
        if (!divyang) {
          throw new APIError(
            "Not a valid user or divyang",
            StatusCodes.UNAUTHORIZED,
            "UserNotFoundError",
            "S"
          );
        }
      } else {
        throw new APIError(
          "Not a valid user or divyang",
          StatusCodes.UNAUTHORIZED,
          "PersonNotFound",
          "S"
        );
      }
    }
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      next(
        new APIError(error.message, StatusCodes.BAD_REQUEST, "TokenError", "S")
      );
    }
    if (error instanceof jwt.JsonWebTokenError) {
      next(
        new APIError(error.message, StatusCodes.BAD_REQUEST, "TokenError", "S")
      );
    }
    if (error instanceof jwt.TokenExpiredError) {
      next(
        new APIError(
          "Token expired",
          StatusCodes.UNAUTHORIZED,
          "TokenExpiredError",
          "S"
        )
      );
    }
    next(error);
  }
}

export { authenticate };

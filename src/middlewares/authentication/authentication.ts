import { NextFunction, Request, Response } from "express";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { verifyDivyang } from "../../services/database/authentication/verifydivyang.js";
import { getUserByIdAuthDB } from "../../services/database/authentication/verifyUser.js";
import { verifySuperAdminIdDB } from "../../services/database/authentication/verifySuperAdmin.js";

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers?.["authorization"];
    if (!token) {
      throw new APIError(
        "Token Object Not Found",
        StatusCodes.UNAUTHORIZED,
        "UserNotFoundError",
        "S"
      );
    }
    const decodedToken = jwt.verify(token, config.SECRET) as Token;
    request.token = decodedToken;
    // checking for token
    if (request.token) {
      throw new APIError(
        "Token Object Not Found",
        StatusCodes.UNAUTHORIZED,
        "UserNotFoundError",
        "S"
      );
    }
    // check for superAdmin
    if (decodedToken.superAdminId) {
      const admin = await verifySuperAdminIdDB(decodedToken.superAdminId);
      if (admin) {
        return next();
      } else {
        throw new APIError(
          "Unauthorized access superAdmin, Check token",
          StatusCodes.UNAUTHORIZED,
          "UserNotFoundError",
          "S"
        );
      }
    }

    // check for user
    if (decodedToken.userId) {
      const user = await getUserByIdAuthDB(decodedToken.userId);
      if (user) {
        return next();
      } else {
        throw new APIError(
          "Unauthorized Access User, check the token",
          StatusCodes.UNAUTHORIZED,
          "UserNotFoundError",
          "S"
        );
      }
    }

    //check divyang
    if (decodedToken.personId) {
      const divyang = await verifyDivyang(decodedToken.personId);
      if (divyang) {
        return next();
      } else {
        throw new APIError(
          "Unauthorized access Divyang, Check the token",
          StatusCodes.UNAUTHORIZED,
          "UserNotFoundError",
          "S"
        );
      }
    }

    // Exceptional case
    throw new APIError(
      "Authentication Error",
      StatusCodes.UNAUTHORIZED,
      "UserNotFoundError",
      "S"
    );
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

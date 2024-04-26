import { NextFunction, Request, Response } from "express";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { verifyDivyang } from "../../services/database/authentication/verifydivyang.js";
import { getUserByIdAuthDB } from "../../services/database/authentication/verifyUserName.js";

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.cookies.token;
    if (!token) {
      throw new APIError(
        "Unauthorized",
        StatusCodes.UNAUTHORIZED,
        "UnauthorizationError",
        "S"
      );
    }
    const decodedToken = jwt.verify(token, config.SECRET) as Token;
    console.log("token", decodedToken);
    request.token = decodedToken;
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
  } catch (err) {
    next(err);
  }
}
export { authenticate };

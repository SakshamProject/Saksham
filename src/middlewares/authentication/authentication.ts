import { NextFunction, Request, Response } from "express";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { getUserByIdDB } from "../../services/database/users/read.js";

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
    request.token = decodedToken;
    const userId = decodedToken.userId;

    const user = await getUserByIdDB(userId);

    if (!user) {
      throw new APIError(
        "user not found",
        StatusCodes.UNAUTHORIZED,
        "UserNotFoundError",
        "S"
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}
export { authenticate };

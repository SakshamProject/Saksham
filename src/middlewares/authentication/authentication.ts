import { NextFunction, Request, Response } from "express";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { getUserByIdDB } from "../../services/database/users/read.js";
import { verifyDivyang } from "../../services/database/authentication/verifydivyang.js";

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

      const divyang = await verifyDivyang(decodedToken.personId);
      if(!divyang){
      throw new APIError(
        "Not a valid user or divyang",
        StatusCodes.UNAUTHORIZED,
        "UserNotFoundError",
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

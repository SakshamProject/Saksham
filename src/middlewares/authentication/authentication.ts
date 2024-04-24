import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { customPayloadType } from "../../types/users/usersSchema.js";
import prisma from "../../services/database/database.js";
import { getUserById } from "../../controllers/users/get.js";
import { getUserByIdDB } from "../../services/database/users/read.js";


// function authenticate(request: Request, response: Response, next: NextFunction) {
//     const user:User = {
//       id: "5927282b-cdc5-48d2-89b0-446cad21707a",
//     };
//     log("info", "[middleware/auth] user: %o", user);
//     request.user = user;
    
//     next();
//   }


async function authenticate(request: Request, response: Response, next: NextFunction) {
  try{
    const token = request.cookies.token;
    console.log(`[+]token`,token)
    if (!token) {
     throw new APIError("Unauthorized",StatusCodes.UNAUTHORIZED,"UnauthorizationError","S")
  }
  const decodedToken = jwt.verify(token,config.SECRET) as customPayloadType;
    const userId = decodedToken.sub;
    console.log(`[+]userId`,userId)

    const user = await getUserByIdDB(userId);
    console.log(`[+]user`,user)

    if (!user) {
     throw new APIError("user not found",StatusCodes.UNAUTHORIZED,"UserNotFoundError","S")  
}
next()
 } catch(err){
    next(err)
  }
}
export { authenticate };

import { NextFunction, Request, Response } from "express";
import {
  createResponseOnlyData,
} from "../../types/createResponseSchema.js"
import { getUserByIdDB } from "../../services/database/users/read.js";

async function getUsers(request: Request, response: Response, next: NextFunction) {
  try {

  } catch (error) {

  }
}
async function getUserById (request: Request, response: Response, next: NextFunction) {
  try {
    const userId: string = request.params.userId;
    const result = await getUserByIdDB(userId);
      const responseData = createResponseOnlyData(result)
    response.send(responseData);
  } catch (error) {
    next(error);
  }
}

export { getUserById }
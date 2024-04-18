import { NextFunction, Request, Response } from "express";
import {
  createResponseOnlyData,
} from "../../types/createResponseSchema.js"
import { getUserByIdDB } from "../../services/database/users/read.js";

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

async function getUsersBySevaKendra(request: Request, response: Response, next: NextFunction) {
  try {
    const sevaKendraId: string = request.params.id;
    // const result = await getUsersBySevaKendraIdDBTransaction(sevaKendraId);
    response.json({ sevaKendraId });
  } catch(error) {

  }
}

export { getUserById, getUsersBySevaKendra }
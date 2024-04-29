import { usersPutSchema } from "../../types/users/usersSchema.js";
import { NextFunction, Response, Request } from "express";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import updateUserTransactionDB from "../../services/database/users/transaction/update.js";
async function putUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const body = usersPutSchema.parse(request.body);
    const updatedBy = request.token?.userId;
    const result = await updateUserTransactionDB(body, id, updatedBy);
    const responseData = createResponseOnlyData(result);
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}

export { putUser };

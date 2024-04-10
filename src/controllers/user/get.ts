import { NextFunction, Request, Response } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import {
    createResponseOnlyData,
    createResponseWithQuery,
} from "../../types/createResponseSchema.js"
import { getUserByIdDB } from "../../services/database/user/read.js";
import { getUsersDBTransaction } from "../../services/database/user/transaction/read.js";
const getUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
        console.log("sending get req");
      const query = getRequestSchema.parse(request.query);
      const result = await getUsersDBTransaction(
        query.start,
        query.rows,
        query.sortOrder,
        query.orderByColumn||"",
        query.searchText || ""
      );
      console.log(`recived responce initial 1${result}`)
      const count: number =  0;
      const total: number = result?.total || 0;
      if (result && result.users) {
        const count: number = result?.users.length || 0;
        const total: number = result?.total || 0;
      }
      const responseData = createResponseWithQuery(
        result?.users || {},
        query,
        total,
        count
      );
        console.log(responseData)
      response.send(responseData);
    } catch (error) {
      next(error);
    }
};
const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result = await getUserByIdDB(id);
      const responseData = createResponseOnlyData(result||{})
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { getUser ,getUserById}
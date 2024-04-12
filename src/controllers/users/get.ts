import { NextFunction, Request, Response } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import {
    createResponseOnlyData,
    createResponseWithQuery,
} from "../../types/createResponseSchema.js"
import { getUserByIdDB } from "../../services/database/users/read.js";
import { getUsersDBTransaction } from "../../services/database/users/transaction/read.js";

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
        query.orderBy||"",
        query.searchText || ""
      );
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

export { getUser ,getUserById}
import { NextFunction, Request, Response } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import {
    createResponseOnlyData,
    createResponseWithQuery,
} from "../../types/createResponseSchema.js"
import { getUserDB } from "../../services/database/user/read.js";
import { getUsersDBTransaction } from "../../services/database/user/transaction/read.js";
const getUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const query = getRequestSchema.parse(request.query);
      const result = await getUsersDBTransaction(
        query.start,
        query.rows,
        query.sortOrder,
        query.searchText || ""
      );
      const count: number = result?.users.length || 0;
      const total: number = result?.total || 0;
      const responseData = createResponseWithQuery(
        result?.users || {},
        query,
        total,
        count
      );
      response.send(responseData);
    } catch (error) {
      next(error);
    }
};
export { getUser }
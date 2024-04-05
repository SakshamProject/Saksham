import { NextFunction, Request, Response } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import { sevaKendraColumnNameMapper } from "../../services/utils/sevaKendra/sevaKendra.js";
import { SevaKendraColumnNameSchema } from "../../types/sevaKendra/sevaKendra.js";
import { createResponseWithQuery } from "../../types/createResponseSchema.js";
import { getSevaKendraDBTransaction } from "../../services/database/sevaKendra/transaction/read.js";

const getSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const orderByColumn = SevaKendraColumnNameSchema.parse(query.orderByColumn);
    const orderByColumnAndSortOrder = sevaKendraColumnNameMapper(
      orderByColumn,
      query.sortOrder
    );
    const result = await getSevaKendraDBTransaction(
      orderByColumnAndSortOrder,
      query.start,
      query.rows
    );
    const total = result?.total || 0;
    const count = result?.sevaKendra.length || 0;
    const responseData = createResponseWithQuery(
      result || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export default getSevaKendra;

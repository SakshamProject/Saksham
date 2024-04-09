import { NextFunction, Request, Response } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import { sevaKendraColumnNameMapper } from "../../services/database/utils/sevaKendra/sevaKendraMapper.js";
import { SevaKendraColumnNameSchema } from "../../types/sevaKendra/sevaKendra.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../types/createResponseSchema.js";
import { getSevaKendraDBTransaction } from "../../services/database/sevaKendra/transaction/read.js";
import { getSevaKendraByIdDB } from "../../services/database/sevaKendra/read.js";
import SevaKendraSearchConditions from "../../services/database/utils/sevaKendra/searchConditions.js";

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
    const searchConditions = SevaKendraSearchConditions(query.searchText);
    const result = await getSevaKendraDBTransaction(
      searchConditions,
      orderByColumnAndSortOrder,
      query.start,
      query.rows
    );
    const total = result?.total || 0;
    const count = result?.sevaKendra.length || 0;
    const responseData = createResponseWithQuery(
      result?.sevaKendra || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getSevaKendraById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const result = await getSevaKendraByIdDB(id);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getSevaKendra, getSevaKendraById };

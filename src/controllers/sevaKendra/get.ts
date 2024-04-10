import { NextFunction, Request, Response } from "express";
import getRequestSchema from "../../types/getRequestSchema.js";
import { sevaKendraColumnNameMapper } from "../../services/database/utils/sevaKendra/sevaKendraMapper.js";
import {
  SevaKendraWhere,
  getSevaKendraSchema,
} from "../../types/sevaKendra/sevaKendra.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../types/createResponseSchema.js";
import { getSevaKendraDBTransaction } from "../../services/database/sevaKendra/transaction/read.js";
import { getSevaKendraByIdDB } from "../../services/database/sevaKendra/read.js";
import { createSevaKendraFilterInputObject } from "../../dto/sevaKendra/create.js";
import SevaKendraGlobalSearchConditions from "../../services/database/utils/sevaKendra/searchConditions.js";

const getSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getSevaKendraSchema.parse(request.query);
    const orderByColumnAndSortOrder = sevaKendraColumnNameMapper(
      query.sorting?.orderByColumn,
      query.sorting?.sortOrder
    );
    const globalSearchConditions: SevaKendraWhere =
      SevaKendraGlobalSearchConditions(query.searchText);
    const sevaKendraWhereInput = createSevaKendraFilterInputObject(
      query.filters,
      globalSearchConditions
    );
    const result = await getSevaKendraDBTransaction(
      sevaKendraWhereInput,
      orderByColumnAndSortOrder,
      query.pagination?.start,
      query.pagination?.rows
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
    console.log("wrong function");
    const id = request.params.id;
    const result = await getSevaKendraByIdDB(id);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getSevaKendra, getSevaKendraById };

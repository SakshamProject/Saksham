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
    const sevaKendraRequest = getSevaKendraSchema.parse(request.body);
    const orderByColumnAndSortOrder = sevaKendraColumnNameMapper(
      sevaKendraRequest.sorting?.orderByColumn,
      sevaKendraRequest.sorting?.sortOrder
    );
    const globalSearchConditions: SevaKendraWhere =
      SevaKendraGlobalSearchConditions(sevaKendraRequest.searchText);
    const sevaKendraWhereInput = createSevaKendraFilterInputObject(
      sevaKendraRequest.filters,
      globalSearchConditions
    );
    const result = await getSevaKendraDBTransaction(
      sevaKendraWhereInput,
      orderByColumnAndSortOrder,
      sevaKendraRequest.pagination?.start,
      sevaKendraRequest.pagination?.rows
    );
    const total = result?.total || 0;
    const count = result?.sevaKendra.length || 0;
    const responseData = createResponseWithQuery(
      result?.sevaKendra || {},
      sevaKendraRequest,
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

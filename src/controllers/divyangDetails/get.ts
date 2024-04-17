import { NextFunction, Response, Request } from "express";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../types/createResponseSchema.js";
import { getDivyangDetailsDBTransaction } from "../../services/database/divyangDetails/transaction/read.js";
import {
  DivyangDetailsSchemaType,
  getDivyangDetailsSchema,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import { getDivyangDetailsByIdDB } from "../../services/database/divyangDetails/read.js";
import DivyangDetailsGlobalSearchConditions from "../../services/database/utils/divyangDetails/searchConditions.js";
import { createDivyangDetailsFilterInputObject } from "../../dto/divyangDetails/post.js";
import { divyangDetailsColumnNameMapper } from "../../services/database/utils/divyangDetails/divyangDetailsMapper.js";

const getDivyangDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangDetailsRequest: DivyangDetailsSchemaType =
      getDivyangDetailsSchema.parse(request.body);
    const orderByColumnAndSortOrder = divyangDetailsColumnNameMapper(
      divyangDetailsRequest.sorting?.orderByColumn,
      divyangDetailsRequest.sorting?.sortOrder
    );
    const globalSearchConditions = DivyangDetailsGlobalSearchConditions(
      divyangDetailsRequest.searchText
    );
    const divyangDetailsWhereInput = createDivyangDetailsFilterInputObject(
      divyangDetailsRequest.filters,
      globalSearchConditions
    );
    const result = await getDivyangDetailsDBTransaction(
      divyangDetailsRequest.pagination?.start,
      divyangDetailsRequest.pagination?.rows,
      orderByColumnAndSortOrder,
      divyangDetailsWhereInput
    );
    const count: number = result?.divyangDetails?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.divyangDetails || {},
      divyangDetailsRequest,
      total,
      count
    );

    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getDivyangDetailsbyId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: getDivyangDetailsSchema | undefined =
      await getDivyangDetailsByIdDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getDivyangDetails, getDivyangDetailsbyId };

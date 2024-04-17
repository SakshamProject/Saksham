import { NextFunction, Request, Response } from "express";
import { sevaKendraColumnNameMapper } from "../../services/database/utils/sevaKendra/sevaKendraMapper.js";
import {
  SevaKendraWhere,
  getSevaKendraSchema,
} from "../../types/sevaKendra/sevaKendra.js";
import {
  createResponseForFilter,
  createResponseOnlyData,
} from "../../types/createResponseSchema.js";
import { getSevaKendraDBTransaction } from "../../services/database/sevaKendra/transaction/read.js";
import {
  getSevaKendraByDistrictIdDB,
  getSevaKendraByIdDB,
  getSevaKendraStatusDB,
} from "../../services/database/sevaKendra/read.js";
import { createSevaKendraFilterInputObject } from "../../dto/sevaKendra/create.js";
import SevaKendraGlobalSearchConditions from "../../services/database/utils/sevaKendra/searchConditions.js";
import { auditLogStatusEnumSchema } from "../../types/inputFieldSchema.js";
import { AuditLogStatusEnum } from "@prisma/client";

const getSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const sevaKendraRequest = getSevaKendraSchema.parse(request.body);
    console.log(request.body, "   parsed  ", sevaKendraRequest);
    const orderByColumnAndSortOrder = sevaKendraColumnNameMapper(
      sevaKendraRequest.sorting?.orderByColumn,
      sevaKendraRequest.sorting?.sortOrder
    );
    const globalSearchConditions: SevaKendraWhere | null =
      sevaKendraRequest.searchText === undefined
        ? null
        : SevaKendraGlobalSearchConditions(sevaKendraRequest.searchText);
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
    const responseData = createResponseForFilter(
      result?.sevaKendra || {},
      request.body,
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
    const currentDate = new Date(Date.now()).toISOString();
    const status = await getSevaKendraStatusDB(id, currentDate);
    const responseData = createResponseOnlyData({
      ...result,
      status: status,
      timestamp: currentDate,
    });
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getSevaKendraByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const status: AuditLogStatusEnum | undefined =
      auditLogStatusEnumSchema.parse(request.query.status);
    const result = await getSevaKendraByDistrictIdDB(districtId, status);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { getSevaKendra, getSevaKendraById, getSevaKendraByDistrictId };

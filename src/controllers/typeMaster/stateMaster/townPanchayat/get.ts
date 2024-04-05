import { NextFunction, Request, Response } from "express";
import { getTownPanchayatByIdDB } from "../../../../services/database/typeMaster/stateMaster/townPanchayat/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import {
  getTownPanchayatByDistrictIdDBTransaction,
  getTownPanchayatDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/townPanchayat/transaction/read.js";

const getTownPanchayat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getTownPanchayatDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.townPanchayat?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.townPanchayat || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getTownPanchayatById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result = await getTownPanchayatByIdDB(
      id,
      query.sortOrder,
      query.start,
      query.rows
    );
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
const getTownPanchayatByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getTownPanchayatByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.townPanchayat?.length || 0;
    const total: number = result?.total || 0;
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

export { getTownPanchayatById, getTownPanchayat, getTownPanchayatByDistrictId };

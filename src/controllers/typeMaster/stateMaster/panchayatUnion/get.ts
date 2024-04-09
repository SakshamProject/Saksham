import { NextFunction, Request, Response } from "express";
import { getPanchayatUnionByIdDB } from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import {
  getPanchayatUnionByDistrictIdDBTransaction,
  getPanchayatUnionDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/transaction/read.js";

const getPanchayatUnion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getPanchayatUnionDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.panchayatUnion?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.panchayatUnion || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getPanchayatUnionById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result = await getPanchayatUnionByIdDB(
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
const getPanchayatUnionByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getPanchayatUnionByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.panchayatUnion?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.panchayatUnion || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export {
  getPanchayatUnionById,
  getPanchayatUnion,
  getPanchayatUnionByDistrictId,
};

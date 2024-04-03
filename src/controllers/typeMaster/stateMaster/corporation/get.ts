import { NextFunction, Request, Response } from "express";
import {
  getCorporationByDistrictIdDB,
  getCorporationByIdDB,
} from "../../../../services/database/typeMaster/stateMaster/corporation/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import {
  getCorporationByDistrictIdDBTransaction,
  getCorporationDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/corporation/transaction/read.js";

const getCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getCorporationDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.corporation.length || 0;
    const total: number = result?.total || 0;
    const resultWithRequest = createResponseWithQuery(
      result?.corporation || {},
      query,
      total,
      count
    );
    response.send(resultWithRequest);
  } catch (error) {
    next(error);
  }
};

const getCorporationById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result = await getCorporationByIdDB(
      id,
      query.sortOrder,
      query.start,
      query.rows
    );
    const resultWithRequest = createResponseOnlyData(result || {});
    response.send(resultWithRequest);
  } catch (error) {
    next(error);
  }
};
const getCorporationByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getCorporationByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.corporation?.length || 0;
    const total: number = result?.total || 0;
    const resultWithRequest = createResponseWithQuery(
      result || {},
      query,
      total,
      count
    );
    response.send(resultWithRequest);
  } catch (error) {
    next(error);
  }
};

export { getCorporationById, getCorporation, getCorporationByDistrictId };

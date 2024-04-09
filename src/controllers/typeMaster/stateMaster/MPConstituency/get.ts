import { NextFunction, Request, Response } from "express";
import { getMPConstituencyByIdDB } from "../../../../services/database/typeMaster/stateMaster/MPConstituency/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { MPConstituency } from "../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import {
  getMPConstituencyByDistrictIdDBTransaction,
  getMPConstituencyDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/MPConstituency/transaction/read.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";

const getMPConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getMPConstituencyDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.MPConstituency?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.MPConstituency || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getMPConstituencyById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result: MPConstituency | undefined | null =
      await getMPConstituencyByIdDB(
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
const getMPConstituencyByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getMPConstituencyByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.MPConstituency?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.MPConstituency || {},
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
  getMPConstituencyById,
  getMPConstituency,
  getMPConstituencyByDistrictId,
};

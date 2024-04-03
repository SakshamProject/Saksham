import { NextFunction, Request, Response } from "express";
import { getMLAConstituencyByIdDB } from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { MLAConstituency } from "../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import {
  getMLAConstituencyByDistrictIdDBTransaction,
  getMLAConstituencyDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/transaction/read.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";

const getMLAConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getMLAConstituencyDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.MLAConstituency?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.MLAConstituency || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getMLAConstituencyById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result: MLAConstituency | undefined | null =
      await getMLAConstituencyByIdDB(
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
const getMLAConstituencyByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getMLAConstituencyByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.MLAConstituency?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.MLAConstituency || {},
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
  getMLAConstituencyById,
  getMLAConstituency,
  getMLAConstituencyByDistrictId,
};

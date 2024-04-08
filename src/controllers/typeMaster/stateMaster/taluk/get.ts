import { NextFunction, Request, Response } from "express";
import { getTalukByIdDB } from "../../../../services/database/typeMaster/stateMaster/taluk/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import {
  getTalukByDistrictIdDBTransaction,
  getTalukDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/taluk/transaction/read.js";

const getTaluk = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getTalukDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.taluk?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.taluk || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getTalukById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result = await getTalukByIdDB(
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
const getTalukByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getTalukByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.taluk?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.taluk || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getTalukById, getTaluk, getTalukByDistrictId };

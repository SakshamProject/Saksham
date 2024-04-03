import { NextFunction, Request, Response } from "express";
import {
  getCorporationByDistrictIdDB,
  getCorporationByIdDB,
  getCorporationDB,
} from "../../../../services/database/typeMaster/stateMaster/corporation/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { Corporation } from "../../../../types/typeMaster/stateMaster/corporationSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";

const getCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: Corporation[] | undefined = await getCorporationDB(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const resultWithRequest = createResponseWithQuery(result || {}, query, 10);
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
    const result: Corporation | undefined | null = await getCorporationByIdDB(
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
    const result: Corporation[] | undefined =
      await getCorporationByDistrictIdDB(
        districtId,
        query.sortOrder,
        query.start,
        query.rows
      );
    const resultWithRequest = createResponseWithQuery(result || {}, query, 10);
    response.send(resultWithRequest);
  } catch (error) {
    next(error);
  }
};

export { getCorporationById, getCorporation, getCorporationByDistrictId };

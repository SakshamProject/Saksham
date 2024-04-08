import { NextFunction, Request, Response } from "express";
import { getMunicipalityByIdDB } from "../../../../services/database/typeMaster/stateMaster/municipality/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import {
  getMunicipalityByDistrictIdDBTransaction,
  getMunicipalityDBTransaction,
} from "../../../../services/database/typeMaster/stateMaster/municipality/transaction/read.js";

const getMunicipality = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getMunicipalityDBTransaction(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    const count: number = result?.municipality?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.municipality || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getMunicipalityById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result = await getMunicipalityByIdDB(
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
const getMunicipalityByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getMunicipalityByDistrictIdDBTransaction(
      districtId,
      query.sortOrder,
      query.start,
      query.rows
    );
    const count: number = result?.municipality?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.municipality || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getMunicipalityById, getMunicipality, getMunicipalityByDistrictId };

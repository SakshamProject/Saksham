import { NextFunction, Request, Response } from "express";
import {
  getCorporationByDistrictIdDB,
  getCorporationByIdDB,
  getCorporationDB,
} from "../../../../services/database/typeMaster/stateMaster/corporation/read.js";
import getRequestSchema from "../../../getRequest.schema.js";
import { Corporation } from "../../../../types/typeMaster/stateMaster/corporationSchema.js";
import inputFieldSchema, {
  queryParamsSchema,
} from "../../../../types/inputField.js";

const getCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const searchText: string =
      queryParamsSchema.parse(request.query.searchName) || "";
    const query = getRequestSchema.parse(request.query);
    const result: Corporation[] | undefined = await getCorporationDB(
      query.sortOrder,
      query.start,
      query.rows,
      searchText
    );
    response.send(result);
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
    response.send(result);
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
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { getCorporationById, getCorporation, getCorporationByDistrictId };

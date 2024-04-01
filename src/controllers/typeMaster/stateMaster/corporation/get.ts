import { NextFunction, Request, Response } from "express";
import {
  getCorporationByDistrictIdDB,
  getCorporationByIdDB,
  getCorporationDB,
} from "../../../../services/database/typeMaster/stateMaster/corporation/read.js";
import getRequestSchema from "../../../getRequest.schema.js";
import { Corporation } from "../../../../types/typeMaster/stateMaster/corporationSchema.js";

const getCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getCorporationDB(
      query.sortOrder,
      query.start,
      query.rows
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
    console.log("here");
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result = await getCorporationByDistrictIdDB(
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

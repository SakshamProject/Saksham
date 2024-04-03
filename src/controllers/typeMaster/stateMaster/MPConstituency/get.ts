import { NextFunction, Request, Response } from "express";
import {
  getMPConstituencyByDistrictIdDB,
  getMPConstituencyByIdDB,
  getMPConstituencyDB,
} from "../../../../services/database/typeMaster/stateMaster/MPConstituency/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { MPConstituency } from "../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";

const getMPConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: MPConstituency[] | undefined = await getMPConstituencyDB(
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText || ""
    );
    response.send(result);
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
    response.send(result);
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
    const result: MPConstituency[] | undefined =
      await getMPConstituencyByDistrictIdDB(
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

export {
  getMPConstituencyById,
  getMPConstituency,
  getMPConstituencyByDistrictId,
};

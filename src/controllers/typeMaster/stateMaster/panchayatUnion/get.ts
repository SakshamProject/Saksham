import { NextFunction, Request, Response } from "express";
import {
  getPanchayatUnionByDistrictIdDB,
  getPanchayatUnionByIdDB,
  getPanchayatUnionDB,
} from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/read.js";
import getRequestSchema from "../../../getRequest.schema.js";
import { PanchayatUnion } from "../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";

const getPanchayatUnion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: PanchayatUnion[] | undefined = await getPanchayatUnionDB(
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

const getPanchayatUnionById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result: PanchayatUnion | undefined | null =
      await getPanchayatUnionByIdDB(
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
const getPanchayatUnionByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result: PanchayatUnion[] | undefined =
      await getPanchayatUnionByDistrictIdDB(
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
  getPanchayatUnionById,
  getPanchayatUnion,
  getPanchayatUnionByDistrictId,
};

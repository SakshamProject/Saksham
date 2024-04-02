import { NextFunction, Request, Response } from "express";
import {
  getMLAConstituencyByDistrictIdDB,
  getMLAConstituencyByIdDB,
  getMLAConstituencyDB,
} from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/read.js";
import getRequestSchema from "../../../getRequest.schema.js";
import { MLAConstituency } from "../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";

const getMLAConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: MLAConstituency[] | undefined = await getMLAConstituencyDB(
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
    response.send(result);
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
    const result: MLAConstituency[] | undefined =
      await getMLAConstituencyByDistrictIdDB(
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
  getMLAConstituencyById,
  getMLAConstituency,
  getMLAConstituencyByDistrictId,
};

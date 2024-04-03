import { NextFunction, Request, Response } from "express";
import {
  getTownPanchayatByDistrictIdDB,
  getTownPanchayatByIdDB,
  getTownPanchayatDB,
} from "../../../../services/database/typeMaster/stateMaster/townPanchayat/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { TownPanchayat } from "../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";

const getTownPanchayat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: TownPanchayat[] | undefined = await getTownPanchayatDB(
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

const getTownPanchayatById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result: TownPanchayat | undefined | null =
      await getTownPanchayatByIdDB(
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
const getTownPanchayatByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result: TownPanchayat[] | undefined =
      await getTownPanchayatByDistrictIdDB(
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

export { getTownPanchayatById, getTownPanchayat, getTownPanchayatByDistrictId };

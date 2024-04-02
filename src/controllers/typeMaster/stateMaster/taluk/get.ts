import { NextFunction, Request, Response } from "express";
import {
  getTalukByDistrictIdDB,
  getTalukByIdDB,
  getTalukDB,
} from "../../../../services/database/typeMaster/stateMaster/taluk/read.js";
import getRequestSchema from "../../../getRequest.schema.js";
import { Taluk } from "../../../../types/typeMaster/stateMaster/talukSchema.js";

const getTaluk = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: Taluk[] | undefined = await getTalukDB(
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

const getTalukById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result: Taluk | undefined | null = await getTalukByIdDB(
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
const getTalukByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result: Taluk[] | undefined =
      await getTalukByDistrictIdDB(
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

export { getTalukById, getTaluk, getTalukByDistrictId };

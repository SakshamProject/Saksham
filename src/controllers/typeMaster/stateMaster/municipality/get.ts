import { NextFunction, Request, Response } from "express";
import {
  getMunicipalityByDistrictIdDB,
  getMunicipalityByIdDB,
  getMunicipalityDB,
} from "../../../../services/database/typeMaster/stateMaster/municipality/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { Municipality } from "../../../../types/typeMaster/stateMaster/municipalitySchema.js";

const getMunicipality = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result: Municipality[] | undefined = await getMunicipalityDB(
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

const getMunicipalityById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const query = getRequestSchema.parse(request.query);
    const result: Municipality | undefined | null = await getMunicipalityByIdDB(
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
const getMunicipalityByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const districtId = request.params.districtId;
    const query = getRequestSchema.parse(request.query);
    const result: Municipality[] | undefined =
      await getMunicipalityByDistrictIdDB(
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

export { getMunicipalityById, getMunicipality, getMunicipalityByDistrictId };

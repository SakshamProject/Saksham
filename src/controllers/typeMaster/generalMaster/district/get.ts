import { NextFunction, Request, Response, response } from "express";
import { getDistrictsWithStateSchema } from "../../../../types/typeMaster/generalMaster/districtSchema.js";
import {
  getDistrictByIdDB,
  getDistrictDB,
} from "../../../../services/database/typeMaster/stateMaster/district/read.js";

const getDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result: getDistrictsWithStateSchema[] | undefined =
      await getDistrictDB();
    response.send(result);
  } catch (error) {
    next(error);
  }
};

const getDistrictById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: getDistrictsWithStateSchema | undefined =
      await getDistrictByIdDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { getDistrict, getDistrictById };

import { NextFunction, Request, Response, response } from "express";
import {
  getDistrictByIdDB,
  getDistrictDB,
  getStateByIdDB,
  getStateDB,
} from "../../services/database/typeMaster/get.js";
import { getState } from "../../types/typeMaster/stateMaster/stateSchema.js";
import { getDistrictsWithState } from "../../types/typeMaster/stateMaster/districtSchema.js";

const getState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result: getState[] | undefined = await getStateDB();
    response.send(result);
  } catch (error) {
    next(error);
  }
};
const getStateById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    console.log(id);
    const result: getState | undefined = await getStateByIdDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

const getDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result: getDistrictsWithState[] | undefined = await getDistrictDB();
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
    const result: getDistrictsWithState | undefined = await getDistrictByIdDB(
      id
    );
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { getState, getDistrict, getStateById, getDistrictById };

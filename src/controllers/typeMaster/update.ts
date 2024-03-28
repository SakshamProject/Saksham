import { NextFunction, Request, Response } from "express";
import { getState } from "../../models/typeMaster/get.js";
import {
  updateDistrictDB,
  updateStateDB,
} from "../../services/database/typeMaster/update.js";
import {
  district,
  districtSchema,
  state,
  stateSchema,
} from "../../models/typeMaster/zod.js";

const updateState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const state: state = stateSchema.parse(request.body);
    const result: state | undefined = await updateStateDB(state, id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
const updateDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const district: district = districtSchema.parse(request.body);
    const result: state | undefined = await updateDistrictDB(id, district);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { updateState, updateDistrict };

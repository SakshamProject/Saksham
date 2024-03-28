import { NextFunction, Request, Response } from "express";
import {
  updateDistrictDB,
  updateStateDB,
} from "../../services/database/typeMaster/update.js";
import {
  State,
  stateSchema,
} from "../../types/typeMaster/stateMaster/stateSchema.js";
import {
  District,
  districtSchema,
} from "../../types/typeMaster/stateMaster/districtSchema.js";

const updateState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const state: State = stateSchema.parse(request.body);
    const result: State | undefined = await updateStateDB(state, id);
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
    const district: District = districtSchema.parse(request.body);
    const result: State | undefined = await updateDistrictDB(id, district);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { updateState, updateDistrict };

import { NextFunction, Request, Response } from "express";
import {
  deleteDistrictDB,
  deleteStateDB,
} from "../../services/database/typeMaster/delete.js";
import { State } from "../../types/typeMaster/stateMaster/stateSchema.js";
import { District } from "../../types/typeMaster/stateMaster/districtSchema.js";

const deleteState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: State | undefined = await deleteStateDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
const deleteDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: District | undefined = await deleteDistrictDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteState, deleteDistrict };

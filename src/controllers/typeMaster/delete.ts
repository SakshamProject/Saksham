import { NextFunction, Request, Response } from "express";
import {
  deleteDistrictDB,
  deleteStateDB,
} from "../../services/database/typeMaster/delete.js";
import { district, state } from "../../models/typeMaster/zod.js";

const deleteState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: state | undefined = await deleteStateDB(id);
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
    const result: district | undefined = await deleteDistrictDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteState, deleteDistrict };

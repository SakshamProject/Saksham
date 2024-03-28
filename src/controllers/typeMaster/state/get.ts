import { NextFunction, Request, Response, response } from "express";
import {
  getStateByIdDB,
  getStateDB,
} from "../../../services/database/typeMaster/state/get.js";
import { getStateSchema } from "../../../types/typeMaster/stateMaster/stateSchema.js";

const getState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const result: getStateSchema[] | undefined = await getStateDB();
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
    const result: getStateSchema | undefined = await getStateByIdDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { getState, getStateById };

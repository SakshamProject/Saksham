import { NextFunction, Request, Response, response } from "express";
import { getStateSchema } from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import {
  getStateByIdDB,
  getStateDB,
} from "../../../../services/database/typeMaster/generalMaster/state/read.js";

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

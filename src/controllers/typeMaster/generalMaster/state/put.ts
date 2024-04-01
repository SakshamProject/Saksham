import { NextFunction, Request, Response } from "express";
import {
  State,
  stateSchema,
} from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import { updateStateDB } from "../../../../services/database/typeMaster/stateMaster/district/update.js";

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

export { updateState };

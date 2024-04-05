import { NextFunction, Request, Response } from "express";
import {
  State,
  stateSchema,
} from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import { updateStateDB } from "../../../../services/database/typeMaster/generalMaster/district/update.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const updateState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const state: State = stateSchema.parse(request.body);
    const result: State | undefined = await updateStateDB(state, id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { updateState };

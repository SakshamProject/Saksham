import { NextFunction, Request, Response } from "express";
import { getState } from "../../models/typeMaster/get.js";
import { updateStateDB } from "../../services/database/typeMaster/update.js";

const updateState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const state: getState = request.body;
    const result: getState | undefined = await updateStateDB(state, id);
    response.send(result);
    return updateState;
  } catch (error) {
    next(error);
  }
};
export { updateState };

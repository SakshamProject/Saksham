import { NextFunction, Request, Response } from "express";
import { State } from "../../../types/typeMaster/stateMaster/stateSchema.js";
import { deleteStateDB } from "../../../services/database/typeMaster/state/delete.js";

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

export { deleteState };

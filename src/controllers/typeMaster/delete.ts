import { NextFunction, Request, Response } from "express";
import { getState } from "../../models/typeMaster/get.js";
import { deleteStateDB } from "../../services/database/typeMaster/delete.js";

const deleteState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: getState | undefined = await deleteStateDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { deleteState };

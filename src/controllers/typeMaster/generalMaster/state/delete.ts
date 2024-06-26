import { NextFunction, Request, Response } from "express";
import { State } from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import { deleteStateDB } from "../../../../services/database/typeMaster/generalMaster/state/delete.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const deleteState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: State | undefined = await deleteStateDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { deleteState };

import { NextFunction, Request, Response } from "express";
import { deleteMPConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MPConstituency/delete.js";
import { MPConstituency } from "../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";

const deleteMPConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: MPConstituency | undefined = await deleteMPConstituencyDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteMPConstituency };

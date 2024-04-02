import { NextFunction, Request, Response } from "express";
import { deleteMLAConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/delete.js";
import { MLAConstituency } from "../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";

const deleteMLAConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: MLAConstituency | undefined = await deleteMLAConstituencyDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteMLAConstituency };

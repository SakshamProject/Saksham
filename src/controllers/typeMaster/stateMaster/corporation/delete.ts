import { NextFunction, Request, Response } from "express";
import { corporationSchema } from "../../../../types/typeMaster/stateMaster/corporationSchema.js";
import { deleteCorporationDB } from "../../../../services/database/typeMaster/stateMaster/corporation/delete.js";

const deleteCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const result = await deleteCorporationDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteCorporation };

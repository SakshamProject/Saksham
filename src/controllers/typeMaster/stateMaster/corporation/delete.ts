import { NextFunction, Request, Response } from "express";
import { deleteCorporationDB } from "../../../../services/database/typeMaster/stateMaster/corporation/delete.js";
import { Corporation } from "../../../../types/typeMaster/stateMaster/corporationSchema.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const deleteCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: Corporation | undefined = await deleteCorporationDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { deleteCorporation };

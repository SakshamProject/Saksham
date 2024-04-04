import { NextFunction, Request, Response } from "express";
import { deleteDisabilityTypeDB } from "../../../../services/database/typeMaster/generalMaster/disabilityType/delete.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

async function deleteDisabilityType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id: string = request.params.id;
    const deletedService = await deleteDisabilityTypeDB(id);
    const resultdata = createResponseOnlyData(deletedService || {});
    response.send(resultdata);
  } catch (err) {
    next(err);
  }
}
export { deleteDisabilityType };

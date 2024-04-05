import { NextFunction, Request, Response } from "express";
import { deletePanchayatUnionDB } from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/delete.js";
import { PanchayatUnion } from "../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const deletePanchayatUnion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: PanchayatUnion | undefined = await deletePanchayatUnionDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { deletePanchayatUnion };

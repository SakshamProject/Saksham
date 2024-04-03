import { NextFunction, Request, Response } from "express";
import { deleteTownPanchayatDB } from "../../../../services/database/typeMaster/stateMaster/townPanchayat/delete.js";
import { TownPanchayat } from "../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const deleteTownPanchayat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: TownPanchayat | undefined = await deleteTownPanchayatDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { deleteTownPanchayat };

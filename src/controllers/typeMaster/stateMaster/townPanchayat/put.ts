import { NextFunction, Request, Response } from "express";
import {
  TownPanchayat,
  townPanchayatSchema,
} from "../../../../types/typeMaster/stateMaster/townPanchayat.js";
import { updateTownPanchayatDB } from "../../../../services/database/typeMaster/stateMaster/townPanchayat/update.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const putTownPanchayat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const townPanchayat = townPanchayatSchema.parse(request.body);
    const result: TownPanchayat | undefined = await updateTownPanchayatDB(
      id,
      townPanchayat
    );

    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { putTownPanchayat };

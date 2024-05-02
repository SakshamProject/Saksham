import { NextFunction, Request, Response } from "express";
import {
  TownPanchayat,
  townPanchayatSchema,
} from "../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import { createTownPanchayatDB } from "../../../../services/database/typeMaster/stateMaster/townPanchayat/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const postTownPanchayat = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const townPnachayat: TownPanchayat = townPanchayatSchema.parse(
      request.body
    );
    const result: TownPanchayat | undefined = await createTownPanchayatDB(
      townPnachayat
    );
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { postTownPanchayat };

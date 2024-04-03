import { NextFunction, Request, Response } from "express";
import {
  Corporation,
  corporationSchema,
} from "../../../../types/typeMaster/stateMaster/corporationSchema.js";
import { createCorporationDB } from "../../../../services/database/typeMaster/stateMaster/corporation/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const postCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const corporation: Corporation = corporationSchema.parse(request.body);
    const result: Corporation | undefined = await createCorporationDB(
      corporation
    );
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { postCorporation };

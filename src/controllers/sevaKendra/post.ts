import { NextFunction, Request, Response } from "express";
import SevaKendraRequestSchema, {
  SevaKendraRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import createSevaKendraTransaction from "../../services/database/sevaKendra/transaction/create.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

const postSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const newSevaKendra: SevaKendraRequestSchemaType =
      SevaKendraRequestSchema.parse(request.body);
    const createdBy = "";
    const result = createSevaKendraTransaction(newSevaKendra, createdBy);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export default postSevaKendra;

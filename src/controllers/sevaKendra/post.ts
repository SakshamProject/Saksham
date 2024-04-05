import { NextFunction, Request, Response } from "express";
import SevaKendraRequestSchema, {
  SevaKendra,
  SevaKendraRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import createSevaKendraTransaction from "../../services/database/sevaKendra/transaction/create.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { createSevaKendraDBObject } from "../../dto/sevaKendra/create.js";
import { createSevaKendraDB } from "../../services/database/sevaKendra/create.js";

const postSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const newSevaKendra: SevaKendraRequestSchemaType =
      SevaKendraRequestSchema.parse(request.body);
    const createdBy = "";
    const sevaKendraDBObject: SevaKendra = createSevaKendraDBObject(
      newSevaKendra,
      createdBy
    );
    const result = await createSevaKendraDB(sevaKendraDBObject);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export default postSevaKendra;

import { Request, Response } from "express";
import SevaKendraRequestSchema, {
  SevaKendraRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import createSevaKendraTransaction from "../../services/database/sevaKendra/transaction/create.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequestSchemaType =
    SevaKendraRequestSchema.parse(request.body);
  const createdBy = "";
  const result = createSevaKendraTransaction(newSevaKendra, createdBy);
  const responseData = createResponseOnlyData(result || {});
  response.send(responseData);
};

export default postSevaKendra;

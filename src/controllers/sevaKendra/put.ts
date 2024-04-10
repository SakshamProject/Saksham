import { NextFunction, Request, Response } from "express";
import SevaKendraRequestSchema, {
  ContactPerson,
  SevaKendraUpdate,
  SevaKendraUpdateRequestSchema,
  SevaKendraUpdateRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import updateSevaKendraDBTransaction from "../../services/database/sevaKendra/transaction/update.js";

const putSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updateRequestSevaKendra: SevaKendraUpdateRequestSchemaType =
      SevaKendraUpdateRequestSchema.parse(request.body);
    const id = request.params.id;
    const updatedBy = "";
    const result = await updateSevaKendraDBTransaction(
      id,
      updateRequestSevaKendra,
      updatedBy
    );

    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default putSevaKendra;

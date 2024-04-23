import { NextFunction, Response, Request } from "express";
import {
  updateDivyangDetailsRequest,
  updateDivyangDetailsRequestSchema,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import updateDivyangDetailsTransactionDB from "../../services/database/divyangDetails/transaction/update.js";
import { getDivyangDetailsByIdDB } from "../../services/database/divyangDetails/read.js";

const putDivyangDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const divyangDetails: updateDivyangDetailsRequest =
      updateDivyangDetailsRequestSchema.parse(request.body);
    const updatedBy = request.user.id;
    // const updatedBy = "e9f5e715-5d4e-4725-bf3f-42a8be95a01d";
    console.log("updatedBy", updatedBy);
    const updatedResult = await updateDivyangDetailsTransactionDB(
      divyangDetails,
      updatedBy,
      id
    );
    const result = await getDivyangDetailsByIdDB(id);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { putDivyangDetails };

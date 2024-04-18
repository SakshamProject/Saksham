import { NextFunction, Request, Response } from "express";
import {
  SevaKendraUpdateRequestSchema,
  SevaKendraUpdateRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import updateSevaKendraDBTransaction from "../../services/database/sevaKendra/transaction/update.js";
import { getDivyangDetailsSchema } from "../../types/divyangDetails/divyangDetailsSchema.js";
import {
  getDivyangDetailsByIdDB,
  getDivyangDetailsStatusDB,
} from "../../services/database/divyangDetails/read.js";

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
    const updatedResult = await updateSevaKendraDBTransaction(
      id,
      updateRequestSevaKendra,
      updatedBy
    );
    const divyangDetails: getDivyangDetailsSchema | undefined =
      await getDivyangDetailsByIdDB(id);
    const currentDate = new Date(Date.now()).toISOString();
    const currentAuditLog = await getDivyangDetailsStatusDB(id, currentDate);
    console.log("current ", currentAuditLog);
    const result = {
      ...divyangDetails,
      status: currentAuditLog?.status,
      description: currentAuditLog?.description,
      effectiveFromDate: currentAuditLog?.date,
      timestamp: currentDate,
    };
    console.log("current audit log", currentAuditLog);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default putSevaKendra;

import { NextFunction, Request, Response } from "express";
import {
  updateDesignationRequestSchema,
  updateDesignationRequestSchemaType,
} from "../../types/designation/designationSchema.js";
import { putDesignationDBTransaction } from "../../services/database/designation/transaction/update.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { getDesignationByIDDB } from "../../services/database/designation/read.js";
import { getDesignationStatus } from "../../services/database/designation/update.js";

async function putDesignation(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: updateDesignationRequestSchemaType =
      updateDesignationRequestSchema.parse(request.body);
    const updatedById = request.token?.userId;
    const id: string = request.params.id;
    const currentDate = new Date().toISOString();
    const auditLog = await getDesignationStatus(id, currentDate);
    const result = await putDesignationDBTransaction(
      body,
      id,
      updatedById,
      auditLog
    );
    const responseResult = await getDesignationByIDDB(result);
    const responseData = createResponseOnlyData(responseResult || {});
    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

export { putDesignation };

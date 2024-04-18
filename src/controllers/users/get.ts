import { NextFunction, Request, Response } from "express";
import {
  createResponseOnlyData,
} from "../../types/createResponseSchema.js"
import { getUserByIdDB } from "../../services/database/users/read.js";
import { getUsersBySevaKendraIdDBTransaction } from "../../services/database/users/transaction/read.js";
import {AuditLogStatusEnum} from "@prisma/client";
import {auditLogStatusEnumSchema} from "../../types/inputFieldSchema.js";

async function getUserById (request: Request, response: Response, next: NextFunction) {
  try {
    const userId: string = request.params.userId;
    const result = await getUserByIdDB(userId);
      const responseData = createResponseOnlyData(result)
    response.send(responseData);
  } catch (error) {
    next(error);
  }
}

async function getUsersBySevaKendra(request: Request, response: Response, next: NextFunction) {
  try {
    const sevaKendraId: string = request.params.id;
    const status: AuditLogStatusEnum | undefined =
        auditLogStatusEnumSchema.parse(request.query.status);
    const result = await getUsersBySevaKendraIdDBTransaction(sevaKendraId, status);
    response.json(result);
  } catch(error) {
    next(error);
  }
}

export { getUserById, getUsersBySevaKendra }
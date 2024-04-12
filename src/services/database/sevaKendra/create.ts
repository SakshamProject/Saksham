import { Prisma } from "@prisma/client";
import {
  SevaKendra,
  SevaKendraAuditLog,
} from "../../../types/sevaKendra/sevaKendra.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const createSevaKendraDB = async (sevaKendra: SevaKendra) => {
  try {
    const createdSevaKendra = await prisma.sevaKendra.create({
      data: sevaKendra,
    });
    return createdSevaKendra;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const createSevaKendraAuditLogDB = async (
  prismaTransaction: Prisma.TransactionClient,
  auditLog: SevaKendraAuditLog
) => {
  try {
    const createdAuditLogs = await prismaTransaction.sevaKendraAuditLog.create({
      data: auditLog,
    });
    return createdAuditLogs;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createSevaKendraDB, createSevaKendraAuditLogDB };

import {
  SevaKendra,
  SevaKendraRequestSchemaType,
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
  sevakendra: SevaKendraRequestSchemaType
) => {
  try {
    const createdAuditLogs: Prisma.CreateCon = await prisma.create({
      data: {
        date: sevakendra.auditLog?.date,
        description: sevakendra.auditLog?.description,
        status: sevakendra.auditLog?.status,
      },
    });
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createSevaKendraDB };

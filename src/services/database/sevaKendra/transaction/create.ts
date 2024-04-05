import { Prisma } from "@prisma/client";
import { createSevaKendraDBObject } from "../../../../dto/sevaKendra/create.js";
import {
  SevaKendra,
  SevaKendraRequestSchemaType,
} from "../../../../types/sevaKendra/sevaKendra.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { createSevaKendraDB } from "../create.js";

const createSevaKendraTransaction = async (
  newSevaKendra: SevaKendraRequestSchemaType,
  createdBy: string
) => {
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const sevaKendraDBObject: SevaKendra = await createSevaKendraDBObject(
          newSevaKendra,
          createdBy
        );
        const createdSevaKendra = await createSevaKendraDB(
          prismaTransaction,
          sevaKendraDBObject
        );
        return createdSevaKendra;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    }
  );
  return transaction;
};

export default createSevaKendraTransaction;

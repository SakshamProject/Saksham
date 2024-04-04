import { Prisma } from "@prisma/client";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { getStateDB, getStateDBTotal } from "../read.js";

const getStateDBTransaction = (
  sortOrder: sortOrderEnum = sortOrderEnum.ascending
) => {
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const states = await getStateDB(sortOrder);
        const total = await getStateDBTotal();
        return { states, total };
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 5000,
      timeout: 10000,
    }
  );
  return transaction;
};

export { getStateDBTransaction };

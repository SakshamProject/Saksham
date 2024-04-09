import { Prisma } from "@prisma/client";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { getStateDB, getStateDBTotal } from "../read.js";
import defaults from "../../../../../../defaults.js";

const getStateDBTransaction = (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  searchText: string = ""
) => {
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const states = await getStateDB(
          prismaTransaction,
          sortOrder,
          searchText
        );
        const total = await getStateDBTotal(prismaTransaction, searchText);
        return { states, total };
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 50000,
      timeout: 10000,
    }
  );
  return transaction;
};

export { getStateDBTransaction };

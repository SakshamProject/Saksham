import { Prisma } from "@prisma/client";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { getDistrictDB, getDistrictDBTotal } from "../read.js";

const getDistrictDBTransaction = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  searchText: string = ""
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const districts = await getDistrictDB(
          prismaTransaction,
          sortOrder,
          searchText
        );
        const total = await getDistrictDBTotal(prismaTransaction, searchText);
        return { districts, total };
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

export { getDistrictDBTransaction };

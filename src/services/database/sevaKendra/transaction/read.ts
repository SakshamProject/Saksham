import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getSevaKendraDB, getSevaKendraDBTotal } from "../read.js";

const getSevaKendraDBTransaction = async (
  searchConditions: object,
  orderByColumnAndSortOrder: Object = {},
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const sevaKendra = await getSevaKendraDB(
          prismaTransaction,
          searchConditions,
          orderByColumnAndSortOrder,
          skip,
          take
        );
        const total = await getSevaKendraDBTotal(
          prismaTransaction,
          searchConditions
        );

        return { sevaKendra, total };
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { getSevaKendraDBTransaction };

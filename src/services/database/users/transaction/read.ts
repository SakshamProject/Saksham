import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { Prisma } from "@prisma/client";
import { getUserDB, getUserTotal } from "../read.js";

const getUsersDBTransaction = async (
    start: number = defaults.skip,
    rows: number = defaults.take,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    orderBy: string,
    searchText: string | undefined
) => {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
            try {
              const users = await getUserDB(
                prismaTransaction,
                sortOrder,
                orderBy,
                searchText
              );
              const total =await getUserTotal(
                 prismaTransaction,
                 searchText
                );
                  return { users, total };
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
  export {getUsersDBTransaction}
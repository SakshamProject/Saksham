import throwDatabaseError from "../../../../utils/errorHandler.js";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import { Prisma } from "@prisma/client";
import { getCommunityCategoryDB, getCommunityCategoryTotal } from "../read.js";

const getCommunityCategoryDBTransaction = async (
    start: number = defaults.skip,
    rows: number = defaults.take,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    searchText: string | undefined
  ) => {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        try {
          const communityCategory = await getCommunityCategoryDB(
            prismaTransaction,
            sortOrder,
            searchText
          );
  
          const total = await getCommunityCategoryTotal(prismaTransaction, searchText);
  
          return { communityCategory, total };
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

  export {getCommunityCategoryDBTransaction};
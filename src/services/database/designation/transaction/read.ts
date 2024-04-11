import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getDesignationDB, getDesignationDBTotal } from "../read.js";

const getDesignationDBTransaction = async (
  searchCondition: Object,
  orderByObject: Object = {},
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const designations = await getDesignationDB(
          prismaTransaction,
          searchCondition,
          orderByObject,
          skip,
          take,
        );

        const total = await getDesignationDBTotal(
          prismaTransaction,
          searchCondition
        );

        return { designations, total };
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

export { getDesignationDBTransaction };

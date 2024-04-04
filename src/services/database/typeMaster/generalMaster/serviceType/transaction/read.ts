import { Prisma } from "@prisma/client";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import {
  getServiceByServiceTypeIdDB,
  getServiceByServiceTypeIdDBTotal,
  getServiceTypeDB,
  getServiceTypeTotal,
} from "../read.js";

const getServiceTypeDBTransaction = async (
  start: number = defaults.skip,
  rows: number = defaults.take,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  searchText: string | undefined
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const serviceType = await getServiceTypeDB(
          prismaTransaction,
          sortOrder,
          searchText
        );

        const total = await getServiceTypeTotal(prismaTransaction, searchText);

        return { serviceType, total };
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

async function getServiceByServiceTypeIdDBTransaction(
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const serviceType = await getServiceByServiceTypeIdDB(
          prismaTransaction,
          id,
          sortOrder
        );

        const total = await getServiceByServiceTypeIdDBTotal(
          prismaTransaction,
          id
        );

        return { serviceType, total };
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
}

export { getServiceTypeDBTransaction, getServiceByServiceTypeIdDBTransaction };

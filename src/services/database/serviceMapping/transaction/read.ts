import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import { ServiceMappingWhere } from "../../../../types/serviceMapping/serviceMappingScreens.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import {
  getServiceMappingByDivyangIdDB,
  getServiceMappingByDivyangIdDBTotal,
  getServiceMappingDB,
  getServiceMappingDBTotal,
} from "../read.js";

const getServiceMappingDBTransaction = async (
  searchConditions: ServiceMappingWhere,
  orderByColumnAndSortOrder: Object = { dateOfService: "asc" },
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const serviceMappings = await getServiceMappingDB(
          prismaTransaction,
          skip,
          take,
          searchConditions,
          orderByColumnAndSortOrder
        );
        const total = await getServiceMappingDBTotal(
          prismaTransaction,
          searchConditions
        );
        return { serviceMappings, total };
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
        maxWait: 5000, // default: 2000
        timeout: 15000, // default: 5000
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getServiceMappingByDivyangIdDBTransaction = async (
  divyangId: string,
  skip: number = defaults.skip,
  take: number = defaults.take,
  searchConditions: ServiceMappingWhere,
  orderByColumnAndSortOrder: Object = { dateOfService: "asc" }
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const serviceMappings = await getServiceMappingByDivyangIdDB(
          prismaTransaction,
          divyangId,
          skip,
          take,
          searchConditions,
          orderByColumnAndSortOrder
        );
        const total = await getServiceMappingByDivyangIdDBTotal(
          prismaTransaction,
          divyangId,
          searchConditions
        );
        return { serviceMappings, total };
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
        maxWait: 5000, // default: 2000
        timeout: 15000, // default: 5000
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export default getServiceMappingDBTransaction;

export { getServiceMappingByDivyangIdDBTransaction };

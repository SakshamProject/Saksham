import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import { ServiceMappingWhere } from "../../../../types/serviceMapping/serviceMappingScreens.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getServiceMappingDB, getServiceMappingDBTotal } from "../read.js";

const getServiceMappingDBTransaction = async (
  skip: number = defaults.skip,
  take: number = defaults.take,
  searchConditions: ServiceMappingWhere,
  orderByColumnAndSortOrder: Object = { dateOfService: "asc" }
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
        timeout: 10000, // default: 5000
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export default getServiceMappingDBTransaction;

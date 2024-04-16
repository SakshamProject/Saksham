import { Prisma } from "@prisma/client";
import defaults from "../../../defaults.js";
import { ServiceMappingWhere } from "../../../types/serviceMapping/serviceMappingScreens.js";
import throwDatabaseError from "../utils/errorHandler.js";
import prisma from "../database.js";

const getServiceMappingDB = async (
  prismaTransaction: Prisma.TransactionClient,
  skip: number = defaults.skip,
  take: number = defaults.take,
  searchConditions: ServiceMappingWhere,
  orderByColumnAndSortOrder: Object = { dateOfService: "asc" }
) => {
  try {
    const serviceMapping =
      await prismaTransaction.divyangServiceMapping.findMany({
        skip: skip,
        take: take,
        where: searchConditions,
        orderBy: orderByColumnAndSortOrder,
      });
    return serviceMapping;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getServiceMappingDBTotal = async (
  prismaTransaction: Prisma.TransactionClient,
  searchConditions: ServiceMappingWhere
) => {
  try {
    const total = await prismaTransaction.divyangServiceMapping.count({
      where: searchConditions,
    });
    return total;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getServiceMappingByIdDB = async (id: string) => {
  const serviceMapping = await prisma.divyangServiceMapping.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      sevaKendraFollowUp: true,
      nonSevaKendraFollowUp: true,
      donor: true,
    },
  });
};
export {
  getServiceMappingDB,
  getServiceMappingDBTotal,
  getServiceMappingByIdDB,
};

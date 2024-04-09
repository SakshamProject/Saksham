import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getSevaKendraDB = async (
  prismaTransaction: any,
  searchConditions: Object,
  orderByColumnAndSortOrder: Object = { name: sortOrderEnum.ascending },
  skip = defaults.skip,
  take = defaults.take
) => {
  try {
    const sevaKendras = await prismaTransaction.sevaKendra.findMany({
      take: take,
      skip: skip,
      where: searchConditions,
      select: {
        id: true,
        name: true,
        district: {
          select: {
            id: true,
            name: true,
            state: {
              select: { id: true, name: true },
            },
          },
        },
        contactPerson: {
          select: {
            id: true,
            name: true,
            phoneNumber1: true,
          },
        },
      },
      orderBy: orderByColumnAndSortOrder,
    });
    return sevaKendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getSevaKendraDBTotal = async (
  prismaTransaction: any,
  searchConditions: Object
) => {
  try {
    const sevaKendras = await prismaTransaction.sevaKendra.count({
      where: searchConditions,
    });
    return sevaKendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getSevaKendraByIdDB = async (sevaKendraId: string): Promise<any> => {
  try {
    const sevaKendra = await prisma.sevaKendra.findFirst({
      where: {
        id: sevaKendraId,
      },
      include: {
        contactPerson: true,
        services: true,
        SevaKendraAuditLog: true,
      },
    });
    return sevaKendra;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getSevaKendraServicesById = async (sevaKendraId: string) => {
  try {
    const services = await prisma.sevaKendra.findFirst({
      where: {
        id: sevaKendraId,
      },
      select: {
        services: {
          select: {
            id: true,
          },
        },
      },
    });
    return services;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export {
  getSevaKendraDB,
  getSevaKendraDBTotal,
  getSevaKendraByIdDB,
  getSevaKendraServicesById,
};

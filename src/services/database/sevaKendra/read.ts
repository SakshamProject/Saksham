import { AuditLogStatusEnum, Prisma } from "@prisma/client";
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
        createdAt: true,
        updatedAt: true,
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
        district: {
          include: { state: true },
        },
        updatedBy: true,
        createdBy: true,
        contactPerson: true,
        services: {
          include: {
            service: {
              include: {
                serviceType: true,
              },
            },
          },
        },
        auditLog: true,
      },
    });
    return sevaKendra;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getSevaKendraServicesById = async (
  prismaTransaction: Prisma.TransactionClient,
  sevaKendraId: string
) => {
  try {
    const services = await prismaTransaction.sevaKendra.findFirst({
      where: {
        id: sevaKendraId,
      },
      select: {
        services: {
          select: {
            serviceId: true,
          },
        },
      },
    });
    return services;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getSevaKendraStatusDB = async (
  sevaKendraId: string,
  currentDate: string
) => {
  try {
    const SevaKendraAuditLog = await prisma.sevaKendraAuditLog.findFirstOrThrow(
      {
        where: {
          AND: [
            { sevaKendraId: sevaKendraId },
            {
              date: {
                lte: currentDate,
              },
            },
          ],
        },
        orderBy: {
          date: "desc",
        },
        take: 1,
      }
    );
    return SevaKendraAuditLog;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getSevaKendraByDistrictIdDB = async (
  districtId: string,
  status: AuditLogStatusEnum | undefined
) => {
  try {
    const currentDate = new Date(Date.now()).toISOString();
    const sevakendras = await prisma.sevaKendra.findMany({
      where: {
        AND: [{ districtId: districtId }],
      },
      select: {
        id: true,
        name: true,
        auditLog: {
          select: {
            status: true,
          },
          where: {
            date: {
              lt: currentDate,
            },
          },
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });
    return sevakendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export {
  getSevaKendraDB,
  getSevaKendraDBTotal,
  getSevaKendraByIdDB,
  getSevaKendraServicesById,
  getSevaKendraByDistrictIdDB,
  getSevaKendraStatusDB,
};

import { Service } from "@prisma/client";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { getServiceTypeWithServiceSchema } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function getServiceTypeByIdDB(id: string | undefined) {
  try {
    const serviceType: getServiceTypeWithServiceSchema | null =
      await prisma.serviceType.findUnique({
        where: {
          id: id,
        },
        include: {
          service: true,
        },
      });
    return serviceType;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getServiceTypeCount() {
  const count: number = await prisma.serviceType.count();
  return count;
}

async function getServiceTypeDB(
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumn: string = "",
  sortOrder: sortOrderEnum= sortOrderEnum.ascending,
  searchText: string = ""
) {
  try {
    const results = await prisma.serviceType.findMany({
      include: {
        service: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: sortOrder,
      },
      where: {
        name: {
          contains: searchText,
        },
      },
    });

    return results;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getServiceByServiceTypeIdDB(id: string | undefined) {
  try {
    const services: Service[] = await prisma.service.findMany({
      where: {
        serviceTypeId: id,
      },
    });

    return services;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

export {
  getServiceTypeByIdDB,
  getServiceTypeDB,
  getServiceTypeCount,
  getServiceByServiceTypeIdDB,
};

import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { serviceMasterColumnNameMapper } from "./serviceMasterColumnNameMapper.js";

import throwDatabaseError from "../utils/errorHandler.js";
import { Prisma } from "@prisma/client";
import searchTextMapper from "../utils/searchTextMapper.js";

async function getServicesDB(
  orderByColumn: string = "createdAt",
  sortOrder: "asc" | "desc" = "asc",
  skip = defaults.skip,
  take = defaults.take,
  searchText = ""
) {
  try {
    const query: Prisma.ServiceFindManyArgs = {
      select: {
        id: true,
        name: true,
        serviceType: {
          select: {
            name: true,
          },
        },
      },
      take: take,
      skip: skip,
      orderBy: serviceMasterColumnNameMapper(orderByColumn, sortOrder),
    };

    if (searchText !== "") {
      query.where = searchTextMapper("Service", searchText);
    }

    const services = await prisma.service.findMany(query);
    return services;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throwDatabaseError(error);
    }
  }
}

async function filterServiceDB(serviceWhereInput: Prisma.ServiceWhereInput) {
  try {
    const query: Prisma.ServiceFindManyArgs = {
      where: serviceWhereInput,
    };
    const results = await prisma.service.findMany(query);
    return results;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}
async function getServiceByIdDB(id: string) {
  try {
    const query = {
      where: {
        id: id,
      },
      include: {
        serviceType: true,
      },
    };

    const service = await prisma.service.findUniqueOrThrow(query);

    return service;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function createServiceDB(query: Prisma.ServiceUncheckedCreateInput) {
  try {
    const service = await prisma.service.create({ data: query });
    return service;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function updateServiceDB(
  serviceUpdate: Prisma.ServiceUncheckedUpdateInput,
  serviceId: string
) {
  try {
    const service = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: serviceUpdate,
    });
    return service;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function deleteServiceByIdDB(serviceId: string) {
  try {
    const result = await prisma.service.delete({
      where: {
        id: serviceId,
      },
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

export {
  getServicesDB,
  getServiceByIdDB,
  createServiceDB,
  deleteServiceByIdDB,
  updateServiceDB,
  filterServiceDB,
};

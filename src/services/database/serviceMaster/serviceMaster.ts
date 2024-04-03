import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { serviceMasterColumnNameMapper } from "./serviceMasterColumnNameMapper.js";

import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
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
          }
        }
      },
      take: take,
      skip: skip,
      orderBy: serviceMasterColumnNameMapper(orderByColumn, sortOrder),
    }

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

async function getServiceByIdDB(
  id: string,
) {
  try {

    const query = {
      where: {
        id: id
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

async function createServiceByIdDB(
  serviceName: string,
  serviceTypeID: string
) {
  try {
    const query: Prisma.ServiceUncheckedCreateInput = {
        name: serviceName,
        serviceTypeId: serviceTypeID,
    }
    const service  = await prisma.service.create({ data: query });

    return service;
  }
  catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}
async function updateServiceByIdDB(
  serviceId: string,
  serviceTypeID:string,
  serviceName: string
) {
  try {

    const updateData: Prisma.ServiceUncheckedCreateInput = {
      serviceTypeId : serviceTypeID,
      name: serviceName
    }
    const service = await prisma.service.update({
      where: {
        id: serviceId
      },
      data: updateData,
    });
    return service;
  }
  catch (error) {
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
  }
  catch(error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

export {
  getServicesDB,
  getServiceByIdDB,
  createServiceByIdDB,
  deleteServiceByIdDB,
  updateServiceByIdDB
};

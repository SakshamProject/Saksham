import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { serviceMasterColumnNameMapper } from "../utils/serviceMaster.js";

import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import APIError from "../../errors/APIError.js";
import {StatusCodes} from "http-status-codes";

async function getServicesDB(
  orderByColumn: string = "serviceName",
  reverse: "asc" | "desc" = "asc",
  skip = defaults.skip,
  take = defaults.take
) {

  try {
    // TODO: Interfaces

    const query = {
      take: take,
      skip: skip,
      include: {
        serviceType: true,
      },
      orderBy: serviceMasterColumnNameMapper(orderByColumn, reverse),
    };

    const services = await prisma.service.findMany(query);
    return services;
  
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function getServiceByIdDB(
  id: string,
) {
  try {
    // TODO: Interfaces

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
    // When adding using ID, serviceSubType is enough
    const service = await prisma.service.create({
      data: {
        name: serviceName,
        serviceTypeId: serviceTypeID,
      },
    });

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
  // When adding using ID, serviceSubType is enough
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

import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { serviceMasterColumnNameMapper } from "../utils/serviceMaster.js";

import throwDatabaseError from "../utils/errorHandler.js";

async function getServicesDB(
  orderByColumn: string = "serviceName",
  reverse: boolean = false,
  skip = defaults.skip,
  take = defaults.take
) {

  try {
    // TODO: Interfaces

    const query = {
      take: take,
      skip: skip,
      include: {
        subType: {
          include: {
            serviceType: true,
          },
        },
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
  skip = defaults.skip,
  take = defaults.take
) {
  try {
    // TODO: Interfaces

    const query = {
      where: {
        id: {
          equals: id,
        },
      },
      take: take,
      skip: skip,
      include: {
        subType: {
          include: {
            serviceType: true,
          },
        },
      },
    };

    const services = await prisma.service.findMany(query);

    return services;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function createServiceByIdDB(
  serviceName: string,
  serviceSubTypeID: string
) {
  // When adding using ID, serviceSubType is enough
  const service = await prisma.service.create({
    data: {
      name: serviceName,
      subTypeId: serviceSubTypeID,
    },
  });

  return service;
}
async function updateServiceByIdDB(
  serviceId: string,
  serviceSubTypeID:string,
  serviceName: string
) {
  // When adding using ID, serviceSubType is enough
  try {
    const service = await prisma.service.update({
      where: {
        id: serviceId
      },
      data: {
        subTypeId : serviceSubTypeID,
        name: serviceName
      }
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

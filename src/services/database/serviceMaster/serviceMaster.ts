import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { serviceMasterColumnNameMapper } from "../utils/serviceMaster.js";
import APIError from "../../errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

async function getServicesDB(
  orderByColumn: string = "serviceName",
  reverse: boolean = false,
  skip = defaults.skip,
  take = defaults.take
) {
  // TODO: Default orderBy Value?
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
    console.log(error);
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
    console.log(error);
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
    })
    console.log("reached services");
    return service;
  }
  catch (error) {
    throw new APIError(
    "There was an error updating the database",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "DatabaseUpdationError",
            1004,
            "E",
            error.meta.cause
    );
  }
}


async function deleteServiceByIdDB(serviceId: string) {
  const result = await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  if (!result) {
    // Row was not found
  }

  return result;
}

export {
  getServicesDB,
  getServiceByIdDB,
  createServiceByIdDB,
  deleteServiceByIdDB,
  updateServiceByIdDB
};

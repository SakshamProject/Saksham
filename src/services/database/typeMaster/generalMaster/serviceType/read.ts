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


async function getServiceTypeDB(
  prismaTransaction: any,
  sortOrder: sortOrderEnum= defaults.sortOrder,
  searchText: string = "",
 
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
          mode: "insensitive" 
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

async function getServiceTypeTotal( prismaTransaction: any,searchText:string|undefined){
  try{
    const serviceTypeTotal:number = await prismaTransaction.serviceType.count(
      {
        where: {
          name: { contains: searchText, mode: "insensitive" },
        },
      }
    )
    return serviceTypeTotal;
  }catch(err){
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
  getServiceByServiceTypeIdDB,
  getServiceTypeTotal
};

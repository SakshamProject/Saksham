import { Service, ServiceType } from "@prisma/client";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { getServiceTypeWithServiceSchema } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function getServiceTypeByIdDB(prismaTransaction:any, id: string | undefined) {
  try {
    const serviceType: ServiceType | null =
      await prismaTransaction.serviceType.findUnique({
        where: {
          id: id,
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
    const results = await prismaTransaction.serviceType.findMany({
     
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

async function getServiceByServiceTypeIdDB(prismaTransaction: any,id: string | undefined,sortOrder:sortOrderEnum=defaults.sortOrder) {
  try {
    const services: Service[] = await prismaTransaction.service.findMany({
      where: {
        serviceTypeId: id,
      },
      orderBy: {
        name: sortOrder,
      },
    });

    return services;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getServiceByServiceTypeIdDBTotal(prismaTransaction: any,id: string | undefined) {
  try {
    const total:number = await prismaTransaction.service.count({
      where: {
        serviceTypeId: id,
      },
   
    });

    return total;
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
  getServiceTypeTotal,
  getServiceByServiceTypeIdDBTotal

};

import { DisabilitySubType } from "@prisma/client";
import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function getDisabilityTypeDB(
    prismaTransaction: any,
    sortOrder: sortOrderEnum= defaults.sortOrder,
    searchText: string = "",
   
  ) {
    try {
      const results = await prisma.disabilityType.findMany({
        include: {
          disability: {
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

  async function getDisabilityTypeTotal( prismaTransaction: any,searchText:string|undefined){
    try{
      const disabilityTypeTotal:number = await prismaTransaction.disabilityType.count(
        {
          where: {
            name: { contains: searchText, mode: "insensitive" },
          },
        }
      )
      return disabilityTypeTotal;
    }catch(err){
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  
  }

  async function getDisabilityTypeByIdDB(prismaTransaction:any, id: string | undefined) {
    try {
      const serviceType =
        await prisma.disabilityType.findUnique({
          where: {
            id: id,
          },
          include: {
            disability: true,
          },
        });
      return serviceType;
    } catch (err) {
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  }

  async function getDisabilitySubTypeByDisabilityTypeIdDB(prismaTransaction: any,id: string | undefined,sortOrder:sortOrderEnum=defaults.sortOrder) {
    try {
      const disabilitysubTypes: DisabilitySubType[] = await prismaTransaction.DisabilitySubType.findMany({
        where: {
          disabilityTypeId: id,
        },
        orderBy: {
          name: sortOrder,
        },
      });
  
      return disabilitysubTypes;
    } catch (err) {
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  }
  
  async function getDisabilitySubTypeByDisabilityTypeIdDBTotal(prismaTransaction: any,id: string | undefined) {
    try {
      const total:number = await prismaTransaction.DisabilitySubType.count({
        where: {
            disabilityTypeId: id,
        },
     
      });
  
      return total;
    } catch (err) {
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  }
  

   export{getDisabilityTypeDB,getDisabilityTypeTotal,getDisabilityTypeByIdDB,getDisabilitySubTypeByDisabilityTypeIdDB,getDisabilitySubTypeByDisabilityTypeIdDBTotal};
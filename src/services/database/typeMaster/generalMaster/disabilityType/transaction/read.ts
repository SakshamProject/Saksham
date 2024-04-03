import { Prisma } from "@prisma/client";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { getDisabilitySubTypeByDisabilityTypeIdDB, getDisabilitySubTypeByDisabilityTypeIdDBTotal, getDisabilityTypeDB, getDisabilityTypeTotal } from "../read.js";

const getDisabilityTypeDBTransaction = async (
    start: number = defaults.skip,
    rows: number = defaults.take,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    searchText: string|undefined
  ) => {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      try {
        const disabilityType = await getDisabilityTypeDB(
            prismaTransaction,sortOrder,searchText
        );

        const total = await getDisabilityTypeTotal(prismaTransaction, searchText);

        return { disabilityType, total };

      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },{
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable, 
            maxWait: 5000, 
            timeout: 10000, 
    });
    return transaction;
  };

  async function getDisabilitySubTypeByDisabilityTypeIdDBTransaction(id:string,sortOrder:sortOrderEnum =defaults.sortOrder){
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
        try {
          const serviceType = await getDisabilitySubTypeByDisabilityTypeIdDB(
              prismaTransaction,id,sortOrder
          );
  
          const total = await getDisabilitySubTypeByDisabilityTypeIdDBTotal(prismaTransaction,id);
  
          return { serviceType, total };
  
        } catch (error) {
          if (error instanceof Error) throwDatabaseError(error);
        }
      },{
              isolationLevel: Prisma.TransactionIsolationLevel.Serializable, 
              maxWait: 5000, 
              timeout: 10000, 
      });
      return transaction;

  }

  export {getDisabilityTypeDBTransaction,getDisabilitySubTypeByDisabilityTypeIdDBTransaction};
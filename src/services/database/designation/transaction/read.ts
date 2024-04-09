import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getDesignationDB, getDesignationDBTotal } from "../read.js";

const getDesignationDBTransaction = async (
    skip: number = defaults.skip,
    take: number = defaults.take,
    orderByColumn:string = "",
    sortOrder: sortOrderEnum = defaults.sortOrder,
    searchText: string =""
  ) => {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        try {
          const designations = await getDesignationDB(
            prismaTransaction,
            skip,
            take,
            orderByColumn,
            sortOrder,
            searchText
          );
  
          const total = await getDesignationDBTotal(
            prismaTransaction,
            skip,
            take,
            orderByColumn,
            sortOrder,
            searchText
          );
  
          return { designations, total };
        } catch (error) {
          if (error instanceof Error) throwDatabaseError(error);
        }
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 10000,
      }
    );
    return transaction;
  };

  export {getDesignationDBTransaction};
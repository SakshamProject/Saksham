import { Prisma } from "@prisma/client";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import {
  getCorporationByDistrictIdDB,
  getCorporationByDistrictIdDBTotal,
  getCorporationDB,
  getCorporationDBTotal,
} from "../read.js";

const getCorporationDBTransaction = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const corporation = await getCorporationDB(
          prismaTransaction,
          sortOrder,
          start,
          rows,
          searchText
        );
        const total = await getCorporationDBTotal(
          prismaTransaction,
          searchText
        );
        return { corporation, total };
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    }
  );
  return transaction;
};
const getCorporationByDistrictIdDBTransaction = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
) => {
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const corporation = await getCorporationByDistrictIdDB(
          prismaTransaction,
          districtId,
          sortOrder,
          start,
          rows
        );
        const total = await getCorporationByDistrictIdDBTotal(
          prismaTransaction,
          districtId
        );
        return { corporation, total };
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    }
  );
  return transaction;
};

export { getCorporationDBTransaction, getCorporationByDistrictIdDBTransaction };

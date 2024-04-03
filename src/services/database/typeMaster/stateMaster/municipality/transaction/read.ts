import { Prisma } from "@prisma/client";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import {
  getMunicipalityByDistrictIdDB,
  getMunicipalityByDistrictIdDBTotal,
  getMunicipalityDB,
  getMunicipalityDBTotal,
} from "../read.js";

const getMunicipalityDBTransaction = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const municipality = await getMunicipalityDB(
          prismaTransaction,
          sortOrder,
          start,
          rows,
          searchText
        );
        const total = await getMunicipalityDBTotal(
          prismaTransaction,
          searchText
        );
        return { municipality, total };
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
const getMunicipalityByDistrictIdDBTransaction = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
) => {
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const municipality = await getMunicipalityByDistrictIdDB(
          prismaTransaction,
          districtId,
          sortOrder,
          start,
          rows
        );
        const total = await getMunicipalityByDistrictIdDBTotal(
          prismaTransaction,
          districtId
        );
        return { municipality, total };
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

export {
  getMunicipalityDBTransaction,
  getMunicipalityByDistrictIdDBTransaction,
};

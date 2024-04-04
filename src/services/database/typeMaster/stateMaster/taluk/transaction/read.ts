import { Prisma } from "@prisma/client";
import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import {
  getTalukByDistrictIdDB,
  getTalukByDistrictIdDBTotal,
  getTalukDB,
  getTalukDBTotal,
} from "../read.js";

const getTalukDBTransaction = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
) => {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const taluk = await getTalukDB(
          prismaTransaction,
          sortOrder,
          start,
          rows,
          searchText
        );
        const total = await getTalukDBTotal(prismaTransaction, searchText);
        return { taluk, total };
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
const getTalukByDistrictIdDBTransaction = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
) => {
  const transaction = prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const taluk = await getTalukByDistrictIdDB(
          prismaTransaction,
          districtId,
          sortOrder,
          start,
          rows
        );
        const total = await getTalukByDistrictIdDBTotal(
          prismaTransaction,
          districtId
        );
        return { taluk, total };
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

export { getTalukDBTransaction, getTalukByDistrictIdDBTransaction };

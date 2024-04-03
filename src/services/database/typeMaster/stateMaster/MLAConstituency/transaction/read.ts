import defaults from "../../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../../types/getRequestSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import {
  getMLAConstituencyByDistrictIdDB,
  getMLAConstituencyByDistrictIdDBTotal,
  getMLAConstituencyDB,
  getMLAConstituencyDBTotal,
} from "../read.js";

const getMLAConstituencyDBTransaction = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
) => {
  const transaction = await prisma.$transaction(async (prismaTransaction) => {
    try {
      const MLAConstituency = await getMLAConstituencyDB(
        prismaTransaction,
        sortOrder,
        start,
        rows,
        searchText
      );
      const total = await getMLAConstituencyDBTotal(
        prismaTransaction,
        searchText
      );
      return { MLAConstituency, total };
    } catch (error) {
      if (error instanceof Error) throwDatabaseError(error);
    }
  });
  return transaction;
};
const getMLAConstituencyByDistrictIdDBTransaction = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
) => {
  const transaction = prisma.$transaction(async (prismaTransaction) => {
    try {
      const MLAConstituency = await getMLAConstituencyByDistrictIdDB(
        prismaTransaction,
        districtId,
        sortOrder,
        start,
        rows
      );
      const total = await getMLAConstituencyByDistrictIdDBTotal(
        prismaTransaction,
        districtId
      );
      return { MLAConstituency, total };
    } catch (error) {
      if (error instanceof Error) throwDatabaseError(error);
    }
  });
  return transaction;
};

export {
  getMLAConstituencyDBTransaction,
  getMLAConstituencyByDistrictIdDBTransaction,
};

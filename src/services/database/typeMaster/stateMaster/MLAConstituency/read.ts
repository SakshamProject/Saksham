import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { MLAConstituency } from "../../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getMLAConstituencyDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<MLAConstituency[] | undefined> => {
  try {
    const MLAConstituency: MLAConstituency[] =
      await prisma.mLAConstituency.findMany({
        where: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        orderBy: {
          name: sortOrder,
        },
        skip: start,
        take: rows,
      });
    return MLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMLAConstituencyDBTotal = async (
  prismaTransaction: any,
  searchText: string
): Promise<number | undefined> => {
  try {
    const MLAConstituencyTotal = await prismaTransaction.mLAConstituency.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    return MLAConstituencyTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMLAConstituencyByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MLAConstituency[] | undefined> => {
  try {
    const MLAConstituency: MLAConstituency[] =
      await prisma.mLAConstituency.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
        skip: start,
        take: rows,
      });
    return MLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMLAConstituencyByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
): Promise<number | undefined> => {
  try {
    const MLAConstituencyTotal = await prismaTransaction.mLAConstituency.count({
      where: {
        districtId: districtId,
      },
    });
    return MLAConstituencyTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMLAConstituencyByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MLAConstituency | undefined | null> => {
  try {
    const MLAConstituency: MLAConstituency | null =
      await prisma.mLAConstituency.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
        orderBy: {
          name: sortOrder,
        },
        skip: start,
        take: rows,
      });
    return MLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getMLAConstituencyDB,
  getMLAConstituencyDBTotal,
  getMLAConstituencyByDistrictIdDB,
  getMLAConstituencyByDistrictIdDBTotal,
  getMLAConstituencyByIdDB,
};

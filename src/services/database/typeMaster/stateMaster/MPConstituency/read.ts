import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { MPConstituency } from "../../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getMPConstituencyDB = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<MPConstituency[] | undefined> => {
  try {
    const MPConstituencies: MPConstituency[] =
      await prisma.mPConstituency.findMany({
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
    return MPConstituencies;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMPConstituencyByDistrictIdDB = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MPConstituency[] | undefined> => {
  try {
    const MPConstituencies: MPConstituency[] =
      await prisma.mPConstituency.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
        skip: start,
        take: rows,
      });
    return MPConstituencies;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMPConstituencyByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MPConstituency | undefined | null> => {
  try {
    const MPConstituencies: MPConstituency | null =
      await prisma.mPConstituency.findFirst({
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
    return MPConstituencies;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getMPConstituencyDB,
  getMPConstituencyByDistrictIdDB,
  getMPConstituencyByIdDB,
};

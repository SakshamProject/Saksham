import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { PanchayatUnion } from "../../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getPanchayatUnionDB = async (
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<PanchayatUnion[] | undefined> => {
  try {
    const panchayatUnions: PanchayatUnion[] =
      await prisma.panchayatUnion.findMany({
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
    return panchayatUnions;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getPanchayatUnionByDistrictIdDB = async (
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<PanchayatUnion[] | undefined> => {
  try {
    const panchayatUnions: PanchayatUnion[] =
      await prisma.panchayatUnion.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
        skip: start,
        take: rows,
      });
    return panchayatUnions;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getPanchayatUnionByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<PanchayatUnion | undefined | null> => {
  try {
    const panchayatUnions: PanchayatUnion | null =
      await prisma.panchayatUnion.findFirst({
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
    return panchayatUnions;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getPanchayatUnionDB,
  getPanchayatUnionByDistrictIdDB,
  getPanchayatUnionByIdDB,
};

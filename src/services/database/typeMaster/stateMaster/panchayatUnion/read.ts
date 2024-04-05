import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { PanchayatUnion } from "../../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getPanchayatUnionDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<PanchayatUnion[] | undefined> => {
  try {
    const panchayatUnions: PanchayatUnion[] =
      await prismaTransaction.panchayatUnion.findMany({
        where: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        orderBy: {
          name: sortOrder,
        },
         
      });
    return panchayatUnions;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getPanchayatUnionDBTotal = async (
  prismaTransaction: any,
  searchText: string
) => {
  try {
    const panchayatUnionsTotal = await prismaTransaction.panchayatUnion.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    return panchayatUnionsTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getPanchayatUnionByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<PanchayatUnion[] | undefined> => {
  try {
    const panchayatUnions: PanchayatUnion[] =
      await prismaTransaction.panchayatUnion.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
         
      });
    return panchayatUnions;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getPanchayatUnionByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
) => {
  try {
    const panchayatUnionsTotal = await prismaTransaction.panchayatUnion.count({
      where: {
        districtId: districtId,
      },
    });
    return panchayatUnionsTotal;
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
         
      });
    return panchayatUnions;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getPanchayatUnionDB,
  getPanchayatUnionDBTotal,
  getPanchayatUnionByDistrictIdDB,
  getPanchayatUnionByDistrictIdDBTotal,
  getPanchayatUnionByIdDB,
};

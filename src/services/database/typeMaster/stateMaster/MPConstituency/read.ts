import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { MPConstituency } from "../../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getMPConstituencyDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<MPConstituency[] | undefined> => {
  try {
    const MPConstituencies: MPConstituency[] =
      await prismaTransaction.mPConstituency.findMany({
        where: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        select: {
          name: true,
          id: true,
          districtId:true,
          district: {
            select: {
              name: true,
              id: true,
              state: true,
            },
          },
        },
        orderBy: {
          name: sortOrder,
        },
         
      });
    return MPConstituencies;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMPConstituencyDBTotal = async (
  prismaTransaction: any,
  searchText: string
) => {
  try {
    const MPConstituenciesTotal = await prismaTransaction.mPConstituency.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    return MPConstituenciesTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMPConstituencyByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MPConstituency[] | undefined> => {
  try {
    const MPConstituencies: MPConstituency[] =
      await prismaTransaction.mPConstituency.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
         
      });
    return MPConstituencies;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMPConstituencyByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
) => {
  try {
    const MPConstituenciesTotal = await prismaTransaction.mPConstituency.count({
      where: {
        districtId: districtId,
      },
    });
    return MPConstituenciesTotal;
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
         
      });
    return MPConstituencies;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getMPConstituencyDB,
  getMPConstituencyDBTotal,
  getMPConstituencyByDistrictIdDB,
  getMPConstituencyByDistrictIdDBTotal,
  getMPConstituencyByIdDB,
};

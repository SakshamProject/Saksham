import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { TownPanchayat } from "../../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getTownPanchayatDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<TownPanchayat[] | undefined> => {
  try {
    const townPanchayats: TownPanchayat[] =
      await prismaTransaction.townPanchayat.findMany({
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
    return townPanchayats;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getTownPanchayatDBTotal = async (
  prismaTransaction: any,
  searchText: string
) => {
  try {
    const townPanchayatsTotal = await prismaTransaction.townPanchayat.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    return townPanchayatsTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTownPanchayatByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<TownPanchayat[] | undefined> => {
  try {
    const townPanchayats: TownPanchayat[] =
      await prismaTransaction.townPanchayat.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
      });
    return townPanchayats;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getTownPanchayatByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
) => {
  try {
    const townPanchayatsTotal = await prismaTransaction.townPanchayat.count({
      where: {
        districtId: districtId,
      },
    });
    return townPanchayatsTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getTownPanchayatByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<TownPanchayat | undefined | null> => {
  try {
    const townPanchayats: TownPanchayat | null =
      await prisma.townPanchayat.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
        orderBy: {
          name: sortOrder,
        },
      });
    return townPanchayats;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getTownPanchayatDB,
  getTownPanchayatDBTotal,
  getTownPanchayatByDistrictIdDB,
  getTownPanchayatByDistrictIdDBTotal,
  getTownPanchayatByIdDB,
};

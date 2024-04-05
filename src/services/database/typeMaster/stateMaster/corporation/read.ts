import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getCorporationDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
) => {
  try {
    const corporation = await prismaTransaction.corporation.findMany({
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
    return corporation;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getCorporationDBTotal = async (
  prismaTransaction: any,
  searchText: string
) => {
  try {
    const corporationsTotal: number = await prismaTransaction.corporation.count(
      {
        where: {
          name: { contains: searchText, mode: "insensitive" },
        },
      }
    );
    return corporationsTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getCorporationByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Corporation[] | undefined> => {
  try {
    const corporations: Corporation[] =
      await prismaTransaction.corporation.findMany({
        where: {
          districtId: districtId,
        },
        orderBy: {
          name: sortOrder,
        },
      });
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getCorporationByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
) => {
  const corporationsTotal: number = await prismaTransaction.corporation.count({
    where: {
      districtId: districtId,
    },
  });
  return corporationsTotal;
};
const getCorporationByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Corporation | undefined | null> => {
  try {
    const corporations: Corporation | null = await prisma.corporation.findFirst(
      {
        where: {
          id: {
            equals: id,
          },
        },
        orderBy: {
          name: sortOrder,
        },
      }
    );
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export {
  getCorporationDB,
  getCorporationDBTotal,
  getCorporationByDistrictIdDB,
  getCorporationByDistrictIdDBTotal,
  getCorporationByIdDB,
};

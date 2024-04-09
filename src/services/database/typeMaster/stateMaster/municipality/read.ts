import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { Municipality } from "../../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getMunicipalityDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<Municipality[] | undefined> => {
  try {
    const municipalities: Municipality[] = await prismaTransaction.municipality.findMany({
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
    return municipalities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMunicipalityDBTotal = async (
  prismaTransaction: any,
  searchText: string
) => {
  try {
    const municipalitiesTotal = await prismaTransaction.municipality.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    return municipalitiesTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMunicipalityByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Municipality[] | undefined> => {
  try {
    const municipalities: Municipality[] = await prismaTransaction.municipality.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
       
    });
    return municipalities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getMunicipalityByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
) => {
  try {
    const municipalitiesTotal = await prismaTransaction.municipality.count({
      where: {
        districtId: districtId,
      },
    });
    return municipalitiesTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMunicipalityByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Municipality | undefined | null> => {
  try {
    const municipalities: Municipality | null =
      await prisma.municipality.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
        orderBy: {
          name: sortOrder,
        },
         
      });
    return municipalities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getMunicipalityDB,
  getMunicipalityDBTotal,
  getMunicipalityByDistrictIdDB,
  getMunicipalityByDistrictIdDBTotal,
  getMunicipalityByIdDB,
};

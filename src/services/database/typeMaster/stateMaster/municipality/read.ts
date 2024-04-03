import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { Municipality } from "../../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getMunicipalityDB = async (
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<Municipality[] | undefined> => {
  try {
    const municipalities: Municipality[] = await prisma.municipality.findMany({
      where: {
        name: {
          contains: searchText,
        },
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return municipalities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMunicipalityByDistrictIdDB = async (
  districtId: string,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Municipality[] | undefined> => {
  try {
    const municipalities: Municipality[] = await prisma.municipality.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return municipalities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMunicipalityByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
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
        skip: start,
        take: rows,
      });
    return municipalities;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getMunicipalityDB,
  getMunicipalityByDistrictIdDB,
  getMunicipalityByIdDB,
};

import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";
import defaults from "../../../../../defaults.js";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getCorporationDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<Corporation[] | undefined> => {
  try {
    const corporations: Corporation[] = await prisma.corporation.findMany({
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
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getCorporationByDistrictIdDB = async (
  districtId: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Corporation[] | undefined> => {
  try {
    const corporations: Corporation[] = await prisma.corporation.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getCorporationByIdDB = async (
  id: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
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
        skip: start,
        take: rows,
      }
    );
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { getCorporationDB, getCorporationByDistrictIdDB, getCorporationByIdDB };

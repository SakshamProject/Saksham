import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";
import defaults from "../../../../../defaults.js";
import { TownPanchayat } from "../../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getTownPanchayatDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<TownPanchayat[] | undefined> => {
  try {
    const townPanchayats: TownPanchayat[] = await prisma.townPanchayat.findMany({
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
    return townPanchayats;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTownPanchayatByDistrictIdDB = async (
  districtId: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<TownPanchayat[] | undefined> => {
  try {
    const townPanchayats: TownPanchayat[] = await prisma.townPanchayat.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return townPanchayats;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTownPanchayatByIdDB = async (
  id: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<TownPanchayat | undefined | null> => {
  try {
    const townPanchayats: TownPanchayat | null = await prisma.townPanchayat.findFirst(
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
    return townPanchayats;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { getTownPanchayatDB, getTownPanchayatByDistrictIdDB, getTownPanchayatByIdDB };

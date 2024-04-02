import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";
import defaults from "../../../../../defaults.js";
import { MLAConstituency } from "../../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getMLAConstituencyDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<MLAConstituency[] | undefined> => {
  try {
    const MLAConstituency: MLAConstituency[] =
      await prisma.mLAConstituency.findMany({
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
    return MLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMLAConstituencyByDistrictIdDB = async (
  districtId: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MLAConstituency[] | undefined> => {
  try {
    const MLAConstituency: MLAConstituency[] = await prisma.mLAConstituency.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return MLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getMLAConstituencyByIdDB = async (
  id: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<MLAConstituency | undefined | null> => {
  try {
    const MLAConstituency: MLAConstituency | null =
      await prisma.mLAConstituency.findFirst({
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
    return MLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getMLAConstituencyDB,
  getMLAConstituencyByDistrictIdDB,
  getMLAConstituencyByIdDB,
};

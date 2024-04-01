import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";
import defaults from "../../../../../defaults.js";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getCorporationDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  try {
    const corporations: Corporation[] = await prisma.corporation.findMany({
      orderBy: {
        name: sortOrder,
      },
      skip: skip,
      take: take,
    });
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getCorporationByDistrictIdDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  districtId: string,
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  try {
    const corporations: Corporation[] = await prisma.corporation.findMany({
      where: {
        districtId: {
          equals: districtId,
        },
      },
      orderBy: {
        name: sortOrder,
      },
      skip: skip,
      take: take,
    });
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getCorporationByIdDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  id: string,
  skip: number = defaults.skip,
  take: number = defaults.take
) => {
  try {
    const corporations: Corporation[] = await prisma.corporation.findMany({
      where: {
        id: {
          equals: id,
        },
      },
      orderBy: {
        name: sortOrder,
      },
      skip: skip,
      take: take,
    });
    return corporations;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { getCorporationDB, getCorporationByDistrictIdDB, getCorporationByIdDB };

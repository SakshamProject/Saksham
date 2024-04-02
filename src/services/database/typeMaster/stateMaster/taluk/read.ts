import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";
import defaults from "../../../../../defaults.js";
import { Taluk } from "../../../../../types/typeMaster/stateMaster/talukSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getTalukDB = async (
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<Taluk[] | undefined> => {
  try {
    const taluks: Taluk[] = await prisma.taluk.findMany({
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
    return taluks;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTalukByDistrictIdDB = async (
  districtId: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Taluk[] | undefined> => {
  try {
    const taluks: Taluk[] = await prisma.taluk.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
      skip: start,
      take: rows,
    });
    return taluks;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTalukByIdDB = async (
  id: string,
  sortOrder: orderByDirectionEnum = orderByDirectionEnum.ascending,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Taluk | undefined | null> => {
  try {
    const taluks: Taluk | null = await prisma.taluk.findFirst(
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
    return taluks;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { getTalukDB, getTalukByDistrictIdDB, getTalukByIdDB };

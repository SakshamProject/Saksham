import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import defaults from "../../../../../defaults.js";
import { Taluk } from "../../../../../types/typeMaster/stateMaster/talukSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getTalukDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take,
  searchText: string
): Promise<Taluk[] | undefined> => {
  try {
    const taluks: Taluk[] = await prismaTransaction.taluk.findMany({
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
    return taluks;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTalukDBTotal = async (prismaTransaction: any, searchText: string) => {
  try {
    const taluksTotal = await prismaTransaction.taluk.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });
    return taluksTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getTalukByDistrictIdDB = async (
  prismaTransaction: any,
  districtId: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Taluk[] | undefined> => {
  try {
    const taluks: Taluk[] = await prismaTransaction.taluk.findMany({
      where: {
        districtId: districtId,
      },
      orderBy: {
        name: sortOrder,
      },
       
    });
    return taluks;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getTalukByDistrictIdDBTotal = async (
  prismaTransaction: any,
  districtId: string
) => {
  try {
    const taluksTotal = await prismaTransaction.taluk.count({
      where: {
        districtId: districtId,
      },
    });
    return taluksTotal;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
const getTalukByIdDB = async (
  id: string,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  start: number = defaults.skip,
  rows: number = defaults.take
): Promise<Taluk | undefined | null> => {
  try {
    const taluks: Taluk | null = await prisma.taluk.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      orderBy: {
        name: sortOrder,
      },
       
    });
    return taluks;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  getTalukDB,
  getTalukDBTotal,
  getTalukByDistrictIdDB,
  getTalukByDistrictIdDBTotal,
  getTalukByIdDB,
};

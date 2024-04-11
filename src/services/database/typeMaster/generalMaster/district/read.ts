import { Prisma } from "@prisma/client";
import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import { getDistrictsWithStateSchema } from "../../../../../types/typeMaster/generalMaster/districtSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getDistrictDB = async (
  prismaTransaction: Prisma.TransactionClient,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  searchText: string = ""
): Promise<getDistrictsWithStateSchema[] | undefined> => {
  try {
    const districts = await prismaTransaction.district.findMany({
      include: { state: true },
      where: {
        name: {
          contains: searchText,
        },
      },
      orderBy: {
        name: sortOrder,
      },
    });
    console.log(districts);
    return districts;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const getDistrictDBTotal = async (
  prismaTransaction: Prisma.TransactionClient,
  searchText: string = ""
) => {
  try {
    const districts = await prismaTransaction.district.count({
      where: {
        name: {
          contains: searchText,
        },
      },
    });
    return districts;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const getDistrictByIdDB = async (
  id: string
): Promise<getDistrictsWithStateSchema | undefined> => {
  try {
    const district: getDistrictsWithStateSchema =
      await prisma.district.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          state: true,
          Corporations: true,
          MLAConstituencies: true,
          MPConstituencies: true,
          Municipalities: true,
          PanchayatUnions: true,
          Taluks: true,
          TownPanchayats: true,
        },
      });
    return district;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { getDistrictDB, getDistrictByIdDB, getDistrictDBTotal };

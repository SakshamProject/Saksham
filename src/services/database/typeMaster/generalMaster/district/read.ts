import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import { getDistrictsWithStateSchema } from "../../../../../types/typeMaster/generalMaster/districtSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getDistrictDB = async (
  prismaTransaction: any,
  sortOrder: sortOrderEnum = defaults.sortOrder
): Promise<getDistrictsWithStateSchema[] | undefined> => {
  try {
    const districts = await prismaTransaction.district.findMany({
      include: { state: true },
      sortOrder: {
        name: sortOrder,
      },
    });
    return districts;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const getDistrictDBTotal = async (prismaTransaction: any) => {
  try {
    const districts = await prismaTransaction.district.count();
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

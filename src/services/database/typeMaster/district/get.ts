import { getDistrictsWithStateSchema } from "../../../../types/typeMaster/stateMaster/districtSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";

const getDistrictDB = async (): Promise<
  getDistrictsWithStateSchema[] | undefined
> => {
  try {
    const districts = await prisma.district.findMany({
      include: { state: true },
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
        },
      });
    return district;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { getDistrictDB, getDistrictByIdDB };

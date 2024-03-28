import { District } from "../../../../types/typeMaster/stateMaster/districtSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";

const deleteDistrictDB = async (id: string): Promise<District | undefined> => {
  try {
    const deletedDistrict: District = await prisma.district.delete({
      where: {
        id: id,
      },
    });
    return deletedDistrict;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { deleteDistrictDB };

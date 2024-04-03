import { PanchayatUnion } from "../../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updatePanchayatUnionDB = async (
  id: string,
  panchayatUnion: PanchayatUnion
): Promise<PanchayatUnion | undefined> => {
  try {
    const updatedPanchayatUnion: PanchayatUnion =
      await prisma.panchayatUnion.update({
        where: {
          id: id,
          districtId: panchayatUnion.districtId,
        },
        data: {
          name: panchayatUnion.name,
        },
      });
    return updatedPanchayatUnion;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updatePanchayatUnionDB };

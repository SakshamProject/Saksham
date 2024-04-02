import { PanchayatUnion } from "../../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deletePanchayatUnionDB = async (
  id: string
): Promise<PanchayatUnion | undefined> => {
  try {
    const deletedPanchayatUnion: PanchayatUnion =
      await prisma.panchayatUnion.delete({
        where: { id: id },
      });
    return deletedPanchayatUnion;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deletePanchayatUnionDB };

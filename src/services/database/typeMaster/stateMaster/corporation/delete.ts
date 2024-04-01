import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteCorporationDB = async (
  id: string
): Promise<Corporation | undefined> => {
  try {
    const deletedCorporation: Corporation = await prisma.corporation.delete({
      where: { id: id },
    });
    return deletedCorporation;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deleteCorporationDB };

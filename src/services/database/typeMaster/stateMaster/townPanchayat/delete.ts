import { TownPanchayat } from "../../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteTownPanchayatDB = async (
  id: string
): Promise<TownPanchayat | undefined> => {
  try {
    const deletedTownPanchayat: TownPanchayat = await prisma.townPanchayat.delete({
      where: { id: id },
    });
    return deletedTownPanchayat;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deleteTownPanchayatDB };

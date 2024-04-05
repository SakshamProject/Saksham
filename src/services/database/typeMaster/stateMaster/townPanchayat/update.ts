import { TownPanchayat } from "../../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateTownPanchayatDB = async (
  id: string,
  townPanchayat: TownPanchayat
): Promise<TownPanchayat | undefined> => {
  try {
    const updatedTownPanchayat: TownPanchayat =
      await prisma.townPanchayat.update({
        where: {
          id: id,
          districtId: townPanchayat.districtId,
        },
        data: {
          name: townPanchayat.name,
        },
      });
    return updatedTownPanchayat;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateTownPanchayatDB };

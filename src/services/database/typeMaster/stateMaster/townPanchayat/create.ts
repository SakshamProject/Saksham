import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { TownPanchayat } from "../../../../../types/typeMaster/stateMaster/townPanchayatSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createTownPanchayatDB = async (
  townPanchayat: Prisma.TownPanchayatUncheckedCreateInput
): Promise<TownPanchayat | undefined> => {
  try {
    const newTownPanchayat: TownPanchayat = await prisma.townPanchayat.create({
      data: {
        name: townPanchayat.name,
        districtId: townPanchayat.districtId,
      },
    });
    return newTownPanchayat;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createTownPanchayatDB };

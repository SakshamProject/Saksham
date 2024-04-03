import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createCorporationDB = async (
  corporation: Prisma.CorporationUncheckedCreateInput
): Promise<Corporation | undefined> => {
  try {
    const newCorporation: Corporation = await prisma.corporation.create({
      data: {
        name: corporation.name,
        districtId: corporation.districtId,
      },
    });
    return newCorporation;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createCorporationDB };

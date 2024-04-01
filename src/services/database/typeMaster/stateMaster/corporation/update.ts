import { Prisma } from "@prisma/client";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateCorporationDB = async (
  id: string,
  corporation: Corporation
): Promise<Corporation | undefined> => {
  try {
    const updatedCorporation: Corporation = await prisma.corporation.update({
      where: {
        id: id,
        districtId: corporation.districtId,
      },
      data: {
        name: corporation.name,
      },
    });
    return updatedCorporation;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateCorporationDB };

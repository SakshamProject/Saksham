import { Prisma } from "@prisma/client";
import { Corporation } from "../../../../../types/typeMaster/stateMaster/corporationSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateCorporation = async (id: string, corporation: Corporation) => {
  try {
    const updatedCorporation = await prisma.corporation.update({
      where: {
        id: id,
        districtId: corporation.districtId,
      },
      data: {
        name: corporation.name,
      },
    });
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateCorporation };

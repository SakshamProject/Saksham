import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { MLAConstituency } from "../../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createMLAConstituencyDB = async (
  mlaconstituency: Prisma.MLAConstituencyUncheckedCreateInput
): Promise<MLAConstituency | undefined> => {
  try {
    const newMLAConstituency: MLAConstituency = await prisma.mLAConstituency.create({
      data: {
        name: mlaconstituency.name,
        districtId: mlaconstituency.districtId,
      },
    });
    return newMLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createMLAConstituencyDB };

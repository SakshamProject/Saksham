import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { MPConstituency } from "../../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createMPConstituencyDB = async (
  MPConstituency: Prisma.CorporationUncheckedCreateInput
): Promise<MPConstituency | undefined> => {
  try {
    const newMPConstituency: MPConstituency =
      await prisma.mPConstituency.create({
        data: {
          name: MPConstituency.name,
          districtId: MPConstituency.districtId,
        },
      });
    return newMPConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createMPConstituencyDB };

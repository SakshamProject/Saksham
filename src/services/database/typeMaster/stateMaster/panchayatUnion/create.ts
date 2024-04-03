import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { PanchayatUnion } from "../../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createPanchayatUnionDB = async (
  panchayatUnion: Prisma.PanchayatUnionUncheckedCreateInput
): Promise<PanchayatUnion | undefined> => {
  try {
    const newPanchayatUnion: PanchayatUnion =
      await prisma.panchayatUnion.create({
        data: {
          name: panchayatUnion.name,
          districtId: panchayatUnion.districtId,
        },
      });
    return newPanchayatUnion;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createPanchayatUnionDB };

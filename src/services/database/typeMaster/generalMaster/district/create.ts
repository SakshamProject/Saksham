import { Prisma } from "@prisma/client";
import { District } from "../../../../../types/typeMaster/generalMaster/districtSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createDistrictDB = async (
  district: Prisma.DistrictUncheckedCreateInput
): Promise<District | undefined> => {
  try {
    const createdDistrict = await prisma.district.create({
      data: {
        name: district.name,
        stateId: district.stateId,
      },
    });
    return createdDistrict;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { createDistrictDB };

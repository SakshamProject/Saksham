import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { Municipality } from "../../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createMunicipalityDB = async (
  municipality: Prisma.MunicipalityUncheckedCreateInput
): Promise<Municipality | undefined> => {
  try {
    const newMunicipality: Municipality = await prisma.municipality.create({
      data: {
        name: municipality.name,
        districtId: municipality.districtId,
      },
    });
    return newMunicipality;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createMunicipalityDB };

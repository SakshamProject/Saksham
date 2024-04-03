import { Municipality } from "../../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateMunicipalityDB = async (
  id: string,
  municipality: Municipality
): Promise<Municipality | undefined> => {
  try {
    const updatedMunicipality: Municipality = await prisma.municipality.update({
      where: {
        id: id,
        districtId: municipality.districtId,
      },
      data: {
        name: municipality.name,
      },
    });
    return updatedMunicipality;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateMunicipalityDB };

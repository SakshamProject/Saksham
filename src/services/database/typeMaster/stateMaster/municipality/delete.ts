import { Municipality } from "../../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteMunicipalityDB = async (
  id: string
): Promise<Municipality | undefined> => {
  try {
    const deletedMunicipality: Municipality = await prisma.municipality.delete({
      where: { id: id },
    });
    return deletedMunicipality;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deleteMunicipalityDB };

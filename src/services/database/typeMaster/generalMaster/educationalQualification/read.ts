import { getEducationalQualificationTypeSchema } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function getEducationalQualificationByIdDB(id: string | undefined) {

  try {
    const educationalQualification: getEducationalQualificationTypeSchema | null =
      await prisma.educationQualificationType.findFirst({
        where: {
          id: id,
        },
        include: {
          educationQualification: true,
        } 
      });
    return educationalQualification;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getEducationalQualificationDB() {
  try {
    const results = await prisma.educationQualificationType.findMany({})
    return results
   } catch (err) {
    return err;
  }
}

export { getEducationalQualificationByIdDB, getEducationalQualificationDB };

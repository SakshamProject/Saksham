import { EducationQualification } from "@prisma/client";
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

async function getEducationQualificationByEducationQualificationTypeIdDB(id: string | undefined) {
  
  try {
    const educationQualifications: EducationQualification[] = await prisma.educationQualification.findMany({
      where: {
        educationQualificationTypeId: id,
      },
    });
 
    return educationQualifications;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

export { getEducationalQualificationByIdDB, getEducationalQualificationDB, getEducationQualificationByEducationQualificationTypeIdDB };

import { EducationQualification } from "@prisma/client";
import { getEducationalQualificationTypeSchema } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";

async function getEducationQualificationTypeByIdDB(id: string | undefined) {

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

async function getEducationQualificationTypeCount() {
  const count: number = await prisma.educationQualificationType.count();
  return count;
}

async function getEducationQualificationTypeDB(
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumn: string = "",
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  searchText: string = ""
) {
  try {
    const results = await prisma.educationQualificationType.findMany({
      skip: skip,
      take: take,
      include: {
        educationQualification: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: sortOrder,
      },
      where: {
        name: {
          contains: searchText,
        },
      },
    });

    return results;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err)
    }
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

export { getEducationQualificationTypeByIdDB, getEducationQualificationTypeDB, 
  getEducationQualificationByEducationQualificationTypeIdDB, getEducationQualificationTypeCount };

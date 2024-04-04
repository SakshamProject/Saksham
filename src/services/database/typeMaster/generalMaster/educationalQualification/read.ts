import { EducationQualification } from "@prisma/client";
import { getEducationalQualificationTypeSchema } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";

async function getEducationQualificationTypeByIdDB(prismaTransaction: any, id: string | undefined) {

  try {
    const educationalQualification: getEducationalQualificationTypeSchema | null =
      await prismaTransaction.educationQualificationType.findFirst({
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

async function getEducationQualificationTypeDBTotal(prismaTransaction: any, searchText: string = "") {
  try {
    const count: number = await prismaTransaction.educationQualificationType.count({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive"
        },
      }
    });
    return count;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err)
    }
  }
}

async function getEducationQualificationTypeDB(
  prismaTransaction: any,
  skip: number = defaults.skip,
  take: number = defaults.take,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  searchText: string = ""
) {
  try {
    const results = await prismaTransaction.educationQualificationType.findMany({
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
          mode: "insensitive"
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

async function getEducationQualificationByEducationQualificationTypeIdDB(
  prismaTransaction: any,
  id: string | undefined,
  skip: number = defaults.skip,
  take: number = defaults.take,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  ) {
  
  try {
    const educationQualifications: EducationQualification[] = await prismaTransaction.educationQualification.findMany({
      skip: skip,
      take: take,
      orderBy: {
        name: sortOrder,
      },
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

async function getEducationQualificationByEducationQualificationTypeIdDBTotal(
  prismaTransaction: any, 
  id: string | undefined) {
  
  try {
    const educationQualificationsTotal = await prismaTransaction.educationQualification.count({
      where: {
        educationQualificationTypeId: id,
      },
    });
 
    return educationQualificationsTotal;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

export { getEducationQualificationTypeByIdDB, getEducationQualificationTypeDB, 
  getEducationQualificationByEducationQualificationTypeIdDB, getEducationQualificationTypeDBTotal,
  getEducationQualificationByEducationQualificationTypeIdDBTotal };

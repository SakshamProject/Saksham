import { Prisma } from '@prisma/client'
import { postEducationalQualificationBodyType } from '../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js'

function createPostEducationQualificationTypeDBObject(
  prismaTransaction: any,
  body: postEducationalQualificationBodyType,
) {
  const postEducationQualificationTypeDBObject: Prisma.EducationQualificationTypeCreateInput = {
    name: body.name,
  }
  return postEducationQualificationTypeDBObject
}

function createPostEducationQualificationDBObject(
  prismaTransaction: any,
  educationQualificationName: string,
  educationQualificationTypeNameId: string | undefined,
) {
  const postEducationQualificationDBObject: Prisma.EducationQualificationCreateInput = {
    name: educationQualificationName,
    educationQualificationType: {
      connect: { id: educationQualificationTypeNameId },
    },
  }
  return postEducationQualificationDBObject
}

export {
  createPostEducationQualificationDBObject,
  createPostEducationQualificationTypeDBObject,
}

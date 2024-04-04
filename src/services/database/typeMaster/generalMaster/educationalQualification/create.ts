import { EducationQualification } from '@prisma/client'
import {
  educationQualificationNameSchemaType,
  postEducationalQualificationType,
  postEducationQualification,
} from '../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'
import { postEducationQualificationType } from '../../../../../controllers/typeMaster/generalMaster/educationalQualification/post.js'
import { createPostEducationQualificationDBObject } from '../../../../../dto/typeMaster/generalMaster/educationalQualification/post.js'

async function createEducationQualificationTypeDB(
  prismaTransaction: any,
  data: postEducationalQualificationType,
) {
  try {
    const educationQualificationType = await prismaTransaction.educationQualificationType.create(
      {
        data: data,
      },
    )

    return educationQualificationType
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err)
    }
  }
}

async function createEducationQualificationDB(
  prismaTransaction: any,
  data: postEducationQualification,
) {
  try {
    const educationQualification: EducationQualification = await prismaTransaction.educationQualification.create(
      {
        data: data,
      },
    )
    return educationQualification
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err)
    }
  }
}

async function createCheckedEducationQualifications(
  prismaTransaction: any,
  educationQualifications: educationQualificationNameSchemaType[],
  updatedEducationQualificationTypeId: string | undefined,
) {
  try {
    const checkedEducationQualificationsId: string[] | undefined = []

    for (let educationQualification of educationQualifications) {
      if (!educationQualification.id) {
        const postEducationQualificationDBObject: postEducationQualification = createPostEducationQualificationDBObject(
          prisma,
          educationQualification.name,
          updatedEducationQualificationTypeId,
        )

        const createdEducationQualification:
          | EducationQualification
          | undefined = await createEducationQualificationDB(
          prisma,
          postEducationQualificationDBObject,
        )

        if (createdEducationQualification) {
          checkedEducationQualificationsId.push(
            createdEducationQualification.id,
          )
        }
      } else {
        if (educationQualification) {
          checkedEducationQualificationsId.push(educationQualification.id)
        }
      }
    }
    return checkedEducationQualificationsId
  } catch (err) {
    throw err
  }
}

export {
  createEducationQualificationDB,
  createEducationQualificationTypeDB,
  createCheckedEducationQualifications,
}

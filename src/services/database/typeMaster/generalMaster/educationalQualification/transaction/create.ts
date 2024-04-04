import {
  EducationQualification,
  EducationQualificationType,
  Prisma,
} from '@prisma/client'
import {
  createPostEducationQualificationDBObject,
  createPostEducationQualificationTypeDBObject,
} from '../../../../../../dto/typeMaster/generalMaster/educationalQualification/post.js'
import {
  postEducationalQualificationBodyType,
  postEducationQualification,
} from '../../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js'
import prisma from '../../../../database.js'
import {
  createEducationQualificationDB,
  createEducationQualificationTypeDB,
} from '../create.js'
import { getEducationQualificationTypeByIdDB } from '../read.js'
import throwDatabaseError from '../../../../utils/errorHandler.js'

async function postEducationQualificationTypeDBTransaction(
  body: postEducationalQualificationBodyType,
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const postEducationQualificationTypeDBObject = createPostEducationQualificationTypeDBObject(
          prismaTransaction,
          body
        )

        const educationQualificationType:
          | EducationQualificationType
          | undefined = await createEducationQualificationTypeDB(
          prismaTransaction,
          postEducationQualificationTypeDBObject,
        )

        for (let educationQualificationName of body.educationQualification) {
          const postEducationQualificationDBObject: postEducationQualification = createPostEducationQualificationDBObject(
            prismaTransaction,
            educationQualificationName,
            educationQualificationType?.id,
          )

          const educationQualification:
            | EducationQualification
            | undefined = await createEducationQualificationDB(
            prismaTransaction,
            postEducationQualificationDBObject,
          )
        }

        const result = await getEducationQualificationTypeByIdDB(
          prismaTransaction,
          educationQualificationType?.id,
        )
        return result
      } catch (error) {
        if (error instanceof Error) {
          throwDatabaseError(error)
        }
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 5000,
      timeout: 10000,
    },
  )
  return transaction
}

export { postEducationQualificationTypeDBTransaction }

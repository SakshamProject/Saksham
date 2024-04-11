import { Prisma } from '@prisma/client'
import { retrieveEducationQualificationsId } from '../../../../../utils/typemaster/educationQualification/educationQualificationType.js'
import { createUpdateEducationQualificationTypeObject } from '../../../../../../dto/typeMaster/generalMaster/educationalQualification/put.js'
import {
  getEducationQualificationTypeWithEducationQualificationSchema,
  updateEducationQualificationTypeRequestSchemaType,
} from '../../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js'
import prisma from '../../../../database.js'
import throwDatabaseError from '../../../../utils/errorHandler.js'
import { createCheckedEducationQualifications } from '../create.js'
import {
  getEducationQualificationByEducationQualificationTypeIdDB,
  getEducationQualificationByEducationQualificationTypeIdDBTotal,
  getEducationQualificationTypeByIdDB,
} from '../read.js'
import { updateEducationQualificationTypeDB } from '../update.js'
import { deleteUncheckedEducationQualifications } from '../delete.js'

async function updateEducationQualificationTypeDBTransaction(
  id: string,
  body: updateEducationQualificationTypeRequestSchemaType,
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const updateEducationQualificationTypeObject = createUpdateEducationQualificationTypeObject(
          prismaTransaction,
          body,
        )

        const updatedEducationQualificationType:
          | getEducationQualificationTypeWithEducationQualificationSchema
          | undefined = await updateEducationQualificationTypeDB(
          prismaTransaction,
          updateEducationQualificationTypeObject,
          id,
        )

        const existingEducationQualifications = await getEducationQualificationByEducationQualificationTypeIdDB(
          prismaTransaction,
          id,
        )

        const existingEducationQualificationsId:
          | string[]
          | undefined = retrieveEducationQualificationsId(
          existingEducationQualifications,
        )

        const educationQualifications = body.educationQualification

        const checkedEducationQualificationsId: string[] = await createCheckedEducationQualifications(
          prismaTransaction,
          educationQualifications,
          updatedEducationQualificationType?.id,
        )

        await deleteUncheckedEducationQualifications(
          prismaTransaction,
          existingEducationQualificationsId,
          checkedEducationQualificationsId,
        )

        return id
      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
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

export { updateEducationQualificationTypeDBTransaction }

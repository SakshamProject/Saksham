import { EducationQualification } from '@prisma/client'
import {
  educationQualificationNameSchemaType,
  getEducationQualificationTypeWithEducationQualificationSchema,
  getSelectedEducationQualificationSchema,
  postEducationQualification,
  updateEducationQualificationTypeRequestSchema,
  updateEducationQualificationTypeRequestSchemaType,
} from '../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js'
import { NextFunction, Response, Request } from 'express'
import { deleteEducationQualificationTypeDB } from '../../../database/typeMaster/generalMaster/educationalQualification/delete.js'
import { createUpdateEducationQualificationTypeObject } from '../../../../dto/typeMaster/generalMaster/educationalQualification/put.js'
import { updateEducationQualificationTypeDB } from '../../../database/typeMaster/generalMaster/educationalQualification/update.js'
import { getEducationQualificationByEducationQualificationTypeIdDB } from '../../../database/typeMaster/generalMaster/educationalQualification/read.js'
import { createPostEducationQualificationDBObject } from '../../../../dto/typeMaster/generalMaster/educationalQualification/post.js'
import { createEducationQualificationDB } from '../../../database/typeMaster/generalMaster/educationalQualification/create.js'
import { updateEducationQualificationTypeDBTransaction } from '../../../database/typeMaster/generalMaster/educationalQualification/transaction/update.js'
import { createResponseOnlyData } from '../../../../types/createResponseSchema.js'
import prisma from '../../../database/database.js'

function retrieveEducationQualificationsId(
  educationQualifications:
    | getSelectedEducationQualificationSchema[]
    | undefined,
) {
  try {
    const educationQualificationsId: string[] = []
    if (educationQualifications) {
      for (let educationQualification of educationQualifications) {
        educationQualificationsId.push(educationQualification.id)
      }
    }
    return educationQualificationsId
  } catch (err) {
    throw err
  }
}

async function deleteUncheckedEducationQualifications(
  existingEducationQualificationsId: string[],
  updatedEducationQualificationsId: string[],
) {
  try {
    for (let existingId of existingEducationQualificationsId) {
      if (!updatedEducationQualificationsId.includes(existingId)) {
        const deletedEducationQualification = await deleteEducationQualificationTypeDB(
          prisma,
          existingId,
        )
      }
    }
  } catch (err) {
    throw err
  }
}

async function createCheckedEducationQualifications(
  educationQualifications: educationQualificationNameSchemaType[],
  updatedEducationQualificationTypeId: string | undefined,
) {
  try {
    const checkedEducationQualificationsId: string[] | undefined = []

    for (let educationQualification of educationQualifications) {
      if (!educationQualification.id) {
        const postEducationQualificationDBObject: postEducationQualification = createPostEducationQualificationDBObject(
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

export { retrieveEducationQualificationsId }

import { NextFunction, Response, Request } from 'express'
import {
  updateEducationQualificationTypeRequestSchema,
  updateEducationQualificationTypeRequestSchemaType,
} from '../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js'
import { updateEducationQualificationTypeDBTransaction } from '../../../../services/database/typeMaster/generalMaster/educationalQualification/transaction/update.js'
import { getEducationQualificationTypeByIdDB } from '../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js'
import { createResponseOnlyData } from '../../../../types/createResponseSchema.js'
import prisma from '../../../../services/database/database.js'

async function putEducationQualificationType(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const body: updateEducationQualificationTypeRequestSchemaType = updateEducationQualificationTypeRequestSchema.parse(
      request.body,
    )

    const id: string = request.params.id

    const result = await updateEducationQualificationTypeDBTransaction(id, body)

    const responseResult = await getEducationQualificationTypeByIdDB(
      prisma,
      result
    )

    const responseData = createResponseOnlyData(responseResult || {})

    response.send(responseData)
  } catch (err) {
    next(err)
  }
}

export { putEducationQualificationType }

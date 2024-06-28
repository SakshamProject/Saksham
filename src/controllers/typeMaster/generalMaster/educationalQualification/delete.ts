import { NextFunction, Response, Request } from 'express'
import { deleteEducationQualificationTypeDB } from '../../../../services/database/typeMaster/generalMaster/educationalQualification/delete.js'
import { createResponseOnlyData } from '../../../../types/createResponseSchema.js'
import prisma from '../../../../services/database/database.js'

async function deleteEducationQualificationType(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const id: string = request.params.id
    const deletedEducationQualification = await deleteEducationQualificationTypeDB(
      id
    )
    const responseData = createResponseOnlyData(deletedEducationQualification || {})
    response.send(responseData)
  } catch (err) {
    next(err)
  }
}
export { deleteEducationQualificationType }

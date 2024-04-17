import { DivyangDetails } from '@prisma/client'
import throwDatabaseError from '../utils/errorHandler.js'
import prisma from '../database.js'
import { createDivyangDetails } from '../../../types/divyangDetails/divyangDetailsSchema.js'
import { auditLogSchemaType } from '../../../types/inputFieldSchema.js'

const createDivyangDetailsDB = async (
  divyangDetails: createDivyangDetails,
): Promise<DivyangDetails | undefined> => {
  try {
    const createdDivyangDetails = await prisma.divyangDetails.create({
      data: divyangDetails,
    })

    return createdDivyangDetails
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      throwDatabaseError(error)
    }
  }
}

const createDivyangDetailsAuditLogDB = async (
  auditLog: auditLogSchemaType,
  divyangDetailsId: string,
) => {
  try {
    const divyangDetailsAuditLog = await prisma.divyangDetailsAuditLog.create({
      data: {
        divyangDetails: {
          connect: {
            id: divyangDetailsId,
          },
        },
        date: auditLog.date,
        description: auditLog.description,
        status: auditLog.status,
      },
    })
    return divyangDetailsAuditLog
  } catch (error) {}
}

export { createDivyangDetailsDB, createDivyangDetailsAuditLogDB }

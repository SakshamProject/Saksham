import { Prisma } from '@prisma/client'
import { updateDivyangDetails } from '../../../types/divyangDetails/divyangDetailsSchema.js'
import prisma from '../database.js'
import throwDatabaseError from '../utils/errorHandler.js'

const updateDivyangDetailsDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangDetails: updateDivyangDetails,
  id: string,
): Promise<updateDivyangDetails | undefined> => {
  try {
    const updatedDivyangDetails = await prisma.divyangDetails.update({
      where: {
        id,
      },
      data: divyangDetails,
    })
    return updatedDivyangDetails
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error)
    }
  }
}

export { updateDivyangDetailsDB }

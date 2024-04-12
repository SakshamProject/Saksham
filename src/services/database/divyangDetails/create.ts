import { DivyangDetails } from '@prisma/client'
import throwDatabaseError from '../utils/errorHandler.js'
import prisma from '../database.js'
import { createDivyangDetails } from '../../../types/divyangDetails/divyangDetailsSchema.js'

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

export { createDivyangDetailsDB }

import { MPConstituency } from '../../../../../types/typeMaster/stateMaster/MPConstituencySchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deleteMPConstituencyDB = async (
  id: string,
): Promise<MPConstituency | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.mPConstituency.findFirst({
          where: { id: id },
          include: {
            DivyangDetails: true,
            DivyangDetailsCommunication: true,
          },
        })
        if (dependency !== null && dependency.DivyangDetails.length > 0) {
          throw new APIError('Divyang Details are present')
        }
        if (
          dependency !== null &&
          dependency.DivyangDetailsCommunication.length > 0
        ) {
          throw new APIError('Divyang Details Communication are present')
        }
        const deletedMPConstituency: MPConstituency = await prismaTransaction.mPConstituency.delete(
          {
            where: { id: id },
          },
        )
        return deletedMPConstituency
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deleteMPConstituencyDB }

import { MLAConstituency } from '../../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deleteMLAConstituencyDB = async (
  id: string,
): Promise<MLAConstituency | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.mLAConstituency.findFirst({
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
        const deletedMLAConstituency: MLAConstituency = await prismaTransaction.mLAConstituency.delete(
          {
            where: { id: id },
          },
        )
        return deletedMLAConstituency
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deleteMLAConstituencyDB }

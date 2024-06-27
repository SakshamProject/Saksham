import { Corporation } from '../../../../../types/typeMaster/stateMaster/corporationSchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deleteCorporationDB = async (id: string) => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.corporation.findFirst({
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
        const deletedCorporation: Corporation = await prismaTransaction.corporation.delete(
          {
            where: { id: id },
          },
        )
        return deletedCorporation
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deleteCorporationDB }

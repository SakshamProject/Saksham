import { Taluk } from '../../../../../types/typeMaster/stateMaster/talukSchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deleteTalukDB = async (id: string): Promise<Taluk | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.taluk.findFirst({
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
        const deletedTaluk: Taluk = await prismaTransaction.taluk.delete({
          where: { id: id },
        })
        return deletedTaluk
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deleteTalukDB }

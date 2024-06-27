import { TownPanchayat } from '../../../../../types/typeMaster/stateMaster/townPanchayatSchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deleteTownPanchayatDB = async (
  id: string,
): Promise<TownPanchayat | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.townPanchayat.findFirst({
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
        const deletedTownPanchayat: TownPanchayat = await prismaTransaction.townPanchayat.delete(
          {
            where: { id: id },
          },
        )
        return deletedTownPanchayat
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deleteTownPanchayatDB }

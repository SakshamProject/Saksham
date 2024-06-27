import { PanchayatUnion } from '../../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deletePanchayatUnionDB = async (
  id: string,
): Promise<PanchayatUnion | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.panchayatUnion.findFirst({
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
        const deletedPanchayatUnion: PanchayatUnion = await prismaTransaction.panchayatUnion.delete(
          {
            where: { id: id },
          },
        )
        return deletedPanchayatUnion
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deletePanchayatUnionDB }

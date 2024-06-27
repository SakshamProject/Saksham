import { Municipality } from '../../../../../types/typeMaster/stateMaster/municipalitySchema.js'
import APIError from '../../../../errors/APIError.js'
import prisma from '../../../database.js'
import throwDatabaseError from '../../../utils/errorHandler.js'

const deleteMunicipalityDB = async (
  id: string,
): Promise<Municipality | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.municipality.findFirst({
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
        const deletedMunicipality: Municipality = await prismaTransaction.municipality.delete(
          {
            where: { id: id },
          },
        )
        return deletedMunicipality
      },
    )
    return deleteTransaction
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error)
  }
}
export { deleteMunicipalityDB }

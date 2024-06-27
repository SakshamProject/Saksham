import { Prisma } from '@prisma/client';
import APIError from '../../../../errors/APIError.js';
import prisma from '../../../database.js';
import throwDatabaseError from '../../../utils/errorHandler.js';

async function deleteDisabilityTypeDB(id: string) {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.disabilityType.findFirst({
          where: { id },
          include: { disability: true, disabilityOfDivyang: true },
        });
        if (
          dependency &&
          (dependency.disability.length > 0 ||
            dependency.disabilityOfDivyang.length > 0)
        ) {
          throw new APIError('Disability type has dependencies');
        } else {
          const deleteddisabilityType = await prisma.disabilityType.delete({
            where: {
              id: id,
            },
            include: {
              disability: true,
            },
          });
          return deleteddisabilityType;
        }
      }
    );
    return deleteTransaction;
  } catch (error) {
    throwDatabaseError(error);
  }
}

async function deleteDisabilitySubTypeDB(
  prismaTransaction: Prisma.TransactionClient,
  id: string
) {
  try {
    const dependency = await prismaTransaction.disabilitySubType.findFirst({
      where: { id },
      include: { divyang: true },
    });
    if (dependency && dependency.divyang.length > 0) {
      throw new APIError('Disability sub type has dependencies');
    } else {
      const deletedDisabilitySubType =
        await prismaTransaction.disabilitySubType.delete({
          where: {
            id: id,
          },
        });
      return deletedDisabilitySubType;
    }
  } catch (error) {
    throwDatabaseError(error);
  }
}

export { deleteDisabilityTypeDB, deleteDisabilitySubTypeDB };

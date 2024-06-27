import { StatusCodes } from 'http-status-codes';
import APIError from '../../../../errors/APIError.js';
import prisma from '../../../database.js';
import throwDatabaseError from '../../../utils/errorHandler.js';

async function deleteServiceTypeDB(id: string) {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.serviceType.findFirst({
          where: { id },
          include: {
            service: true,
          },
        });
        if (dependency && dependency.service.length > 0) {
          throw new APIError(
            'service type has dependencies ',
            StatusCodes.BAD_REQUEST
          );
        } else {
          const deletedService = await prisma.serviceType.delete({
            where: {
              id: id,
            },
          });
          return deletedService;
        }
      }
    );
    return deleteTransaction;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function deleteServiceDB(prismaTransaction: any, id: string) {
  try {
    const deletedService = await prismaTransaction.service.delete({
      where: {
        id: id,
      },
    });
    console.log('delete db layer');
    console.log(deletedService);
    return deletedService;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function deleteUncheckedServices(
  prismaTransaction: any,
  exisitingServicesId: string[],
  updatedServicesId: string[]
) {
  try {
    for (let exisitingId of exisitingServicesId) {
      if (!updatedServicesId.includes(exisitingId)) {
        const deletedService = await deleteServiceDB(
          prismaTransaction,
          exisitingId
        );
      }
    }
  } catch (err) {
    throw err;
  }
}

export { deleteServiceTypeDB, deleteServiceDB, deleteUncheckedServices };

import { StatusCodes } from 'http-status-codes';
import APIError from '../../errors/APIError.js';
import prisma from '../database.js';
import throwDatabaseError from '../utils/errorHandler.js';

async function deleteServiceByIdDB(serviceId: string) {
  try {
    const deletetransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependencies = await prismaTransaction.service.findFirst({
          where: {
            id: serviceId,
          },
          include: {
            divyang: true,
            sevaKendras: true,
          },
        });
        if (
          dependencies &&
          (dependencies.divyang.length > 0 ||
            dependencies.sevaKendras.length > 0)
        ) {
          throw new APIError(
            'Service has dependencies',
            StatusCodes.BAD_REQUEST
          );
        } else {
          const result = await prismaTransaction.service.delete({
            where: {
              id: serviceId,
            },
          });

          return result;
        }
      }
    );
    return deletetransaction;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

export { deleteServiceByIdDB };

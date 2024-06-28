import { StatusCodes } from 'http-status-codes';
import { State } from '../../../../../types/typeMaster/generalMaster/stateSchema.js';
import APIError from '../../../../errors/APIError.js';
import prisma from '../../../database.js';
import throwDatabaseError from '../../../utils/errorHandler.js';

const deleteStateDB = async (id: string): Promise<State | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.state.findFirst({
          where: {
            id,
          },
          include: {
            districts: true,
          },
        });
        if (dependency && dependency.districts.length > 0) {
          throw new APIError('State has districts', StatusCodes.BAD_REQUEST);
        } else {
          const deletedState: State = await prismaTransaction.state.delete({
            where: {
              id: id,
            },
          });
          return deletedState;
        }
      }
    );
    return deleteTransaction;
  } catch (error) {
    throwDatabaseError(error);
  }
};

export { deleteStateDB };

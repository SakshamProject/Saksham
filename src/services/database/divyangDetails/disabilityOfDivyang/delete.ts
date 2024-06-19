import prisma from '../../database.js';
import throwDatabaseError from '../../utils/errorHandler.js';

const deleteDisabilityOfDivyangDB = (id: string) => {
  try {
    const deletedDisability = prisma.disabilityOfDivyang.delete({
      where: {
        id: id,
      },
    });
    return deletedDisability;
  } catch (error) {
    throwDatabaseError(error);
  }
};

export { deleteDisabilityOfDivyangDB };

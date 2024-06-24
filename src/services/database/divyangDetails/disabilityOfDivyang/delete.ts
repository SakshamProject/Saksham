import prisma from '../../database.js';
import throwDatabaseError from '../../utils/errorHandler.js';

const deleteDisabilityOfDivyangDB = async (id: string) => {
  try {
    const deletedDisability = await prisma.disabilityOfDivyang.delete({
      where: {
        id: id,
      },
      include: {
        divyang: {
          select: {
            personId: true,
          },
        },
      },
    });
    return deletedDisability;
  } catch (error) {
    throwDatabaseError(error);
  }
};

export { deleteDisabilityOfDivyangDB };

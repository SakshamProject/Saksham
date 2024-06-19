import { Prisma } from '@prisma/client';
import throwDatabaseError from '../../utils/errorHandler.js';
import prisma from '../../database.js';

const updateDisabilityOfDivyangDB = async (
  id: string,
  disability: Prisma.DisabilityOfDivyangUpdateInput
) => {
  try {
    const updatedDisability = await prisma.disabilityOfDivyang.update({
      where: { id: id },
      data: disability,
    });
    return updatedDisability;
  } catch (error) {
    throwDatabaseError(error);
  }
};
export { updateDisabilityOfDivyangDB };

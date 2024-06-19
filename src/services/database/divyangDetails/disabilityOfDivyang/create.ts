import { Prisma } from '@prisma/client';
import throwDatabaseError from '../../utils/errorHandler.js';
import prisma from '../../database.js';

const createDisabilityOfDivyangDB = async (
  disabilityOfDivyang: Prisma.DisabilityOfDivyangCreateInput
) => {
  try {
    const newDisability = await prisma.disabilityOfDivyang.create({
      data: disabilityOfDivyang,
    });
    return newDisability;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createDisabilityOfDivyangDB };

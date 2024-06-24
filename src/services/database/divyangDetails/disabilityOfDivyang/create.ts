import { Prisma } from '@prisma/client';
import throwDatabaseError from '../../utils/errorHandler.js';
import prisma from '../../database.js';
import { Request } from 'express';
import { handleUpdateDisabilityCard } from '../../../files/disabilityOfDivyang.js';

const createDisabilityOfDivyangTransactionDB = async (
  request: Request,
  disability: Prisma.DisabilityOfDivyangCreateInput
) => {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      const result = await createDisabilityOfDivyangDB(
        prismaTransaction,
        disability
      );
      const disabilityId = result?.id;
      const personId = result?.divyang.personId;
      if (
        disabilityId !== undefined &&
        personId !== undefined &&
        request.body.disabilityCardFileName !== undefined
      ) {
        const fileUpdateResult = await handleUpdateDisabilityCard(
          prismaTransaction,
          request,
          personId,
          disabilityId
        );
        return fileUpdateResult;
      }

      return result;
    });
    return transaction;
  } catch (error) {
    throwDatabaseError(error);
  }
};

const createDisabilityOfDivyangDB = async (
  prismaTransaction: Prisma.TransactionClient,
  disabilityOfDivyang: Prisma.DisabilityOfDivyangCreateInput
) => {
  try {
    const newDisability = await prismaTransaction.disabilityOfDivyang.create({
      data: disabilityOfDivyang,
      include: {
        divyang: {
          select: {
            personId: true,
          },
        },
      },
    });
    return newDisability;
  } catch (error) {
    throwDatabaseError(error);
  }
};

export { createDisabilityOfDivyangDB, createDisabilityOfDivyangTransactionDB };

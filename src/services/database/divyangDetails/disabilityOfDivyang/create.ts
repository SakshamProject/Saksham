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
        disability.disabilityCardFileName !== undefined
      ) {
        const key: string | null = await handleUpdateDisabilityCard(
          request,
          personId,
          disabilityId
        );
        return await prismaTransaction.disabilityOfDivyang.update({
          where: {
            id: disabilityId,
          },
          data: {
            disabilityCardFileName: disability.disabilityCardFileName,
            disabilityCardKey: key,
          },
        });
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

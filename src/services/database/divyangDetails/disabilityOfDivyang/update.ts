import { Prisma } from '@prisma/client';
import throwDatabaseError from '../../utils/errorHandler.js';
import prisma from '../../database.js';
import { Request } from 'express';
import { handleUpdateDisabilityCard } from '../../../files/disabilityOfDivyang.js';
import { updateDisabilityOfDivyangDBObject } from '../../../../dto/divyangDetails/disabilityOfDivyang/put.js';

const updateDisabilityOfDivyangTrasactionDB = async (
  request: Request,
  id: string,
  disability: Prisma.DisabilityOfDivyangUpdateInput
) => {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      const result = await updateDisabilityOfDivyangDB(
        prismaTransaction,
        id,
        disability
      );

      if (request.body.disabilityCardFileName !== undefined && result) {
        return await handleUpdateDisabilityCard(
          prismaTransaction,
          request,
          request.body.personId,
          result.id
        );
      }
      return result;
    });
    return transaction;
  } catch (error) {
    throwDatabaseError(error);
  }
};

const updateDisabilityOfDivyangDB = async (
  prismaTransaction: Prisma.TransactionClient,
  id: string,
  disability: Prisma.DisabilityOfDivyangUpdateInput
) => {
  try {
    const updatedDisability =
      await prismaTransaction.disabilityOfDivyang.update({
        where: { id: id },
        data: disability,
      });
    return updatedDisability;
  } catch (error) {
    throwDatabaseError(error);
  }
};
export { updateDisabilityOfDivyangTrasactionDB };

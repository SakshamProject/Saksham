import { Prisma } from '@prisma/client';
import { Request } from 'express';
import prisma from '../../database.js';
import { createPersonDB } from '../create.js';
import { handleProfilePhotoFile } from '../../../files/profilePhoto.js';

const createPersonTransactionDB = async (
  userInputObject: Prisma.PersonCreateInput,
  request: Request
) => {
  try {
    const transaction = prisma.$transaction(async (prismaTransaction) => {
      const result = await createPersonDB(prismaTransaction, userInputObject);
      await handleProfilePhotoFile(
        prismaTransaction,
        request,
        true,
        result?.id
      );
      return result;
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};

export default createPersonTransactionDB;

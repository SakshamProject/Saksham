import { DivyangDetails } from '@prisma/client';
import prisma from '../../database.js';
import { createDivyangDetailsDB } from '../create.js';
import { createDivyangDetails } from '../../../../types/divyangDetails/divyangDetailsSchema.js';
import { handleProfilePhotoFile } from '../../../files/profilePhoto.js';
import { Request } from 'express';

export const createDivyangDetailsTransactionDB = (
  request: Request,
  divyangDetailsDBObject: createDivyangDetails
) => {
  try {
    const transaction = prisma.$transaction(async (prismaTransaction) => {
      const result: DivyangDetails | undefined = await createDivyangDetailsDB(
        prismaTransaction,
        divyangDetailsDBObject
      );
      await handleProfilePhotoFile(
        prismaTransaction,
        request,
        false,
        result?.personId
      );
      return result;
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};

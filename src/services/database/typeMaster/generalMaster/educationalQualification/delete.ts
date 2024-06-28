import { Prisma } from '@prisma/client';
import prisma from '../../../database.js';
import throwDatabaseError from '../../../utils/errorHandler.js';
import APIError from '../../../../errors/APIError.js';
import { StatusCodes } from 'http-status-codes';

async function deleteEducationQualificationTypeDB(id: string) {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency =
          await prismaTransaction.educationQualificationType.findFirst({
            where: { id },
            include: {
              divyangEducationQualification: true,
              educationQualification: true,
            },
          });
        if (
          dependency &&
          dependency.divyangEducationQualification.length > 0 &&
          dependency.educationQualification.length > 0
        ) {
          throw new APIError(
            'Education Qualification has dependency',
            StatusCodes.BAD_REQUEST
          );
        } else {
          const deletedEducationQualification =
            await prismaTransaction.educationQualificationType.delete({
              where: {
                id: id,
              },
            });
          return deletedEducationQualification;
        }
      }
    );
    return deleteTransaction;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      throwDatabaseError(err);
    }
  }
}

async function deleteEducationQualificationDB(
  prismaTransaction: Prisma.TransactionClient,
  id: string
) {
  try {
    const dependency = await prismaTransaction.educationQualification.findFirst(
      {
        where: {
          id,
        },
        include: {
          divyang: true,
        },
      }
    );
    if (dependency && dependency.divyang.length > 0) {
      throw new APIError('Education qualification subtype has depencies');
    } else {
      const deletedEducationQualification =
        await prismaTransaction.educationQualification.delete({
          where: {
            id: id,
          },
        });
      return deletedEducationQualification;
    }
  } catch (error) {
    throwDatabaseError(error);
  }
}

async function deleteUncheckedEducationQualifications(
  prismaTransaction: any,
  existingEducationQualificationsId: string[],
  updatedEducationQualificationsId: string[]
) {
  try {
    for (let existingId of existingEducationQualificationsId) {
      if (!updatedEducationQualificationsId.includes(existingId)) {
        console.log(existingId);
        const deletedEducationQualification =
          await deleteEducationQualificationDB(prismaTransaction, existingId);
      }
    }
  } catch (err) {
    throw err;
  }
}

export {
  deleteEducationQualificationTypeDB,
  deleteEducationQualificationDB,
  deleteUncheckedEducationQualifications,
};

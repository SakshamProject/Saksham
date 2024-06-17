import { AuditLogStatusEnum, Prisma } from '@prisma/client';
import prisma from '../../database.js';
import throwDatabaseError from '../../utils/errorHandler.js';
import { updateUserDBObject } from '../../../../dto/users/put.js';
import { Request } from 'express';
import { saveFile } from '../../../../middlewares/fileHandler/fileHandler.js';
import { userPutRequestType } from '../../../../types/users/usersSchema.js';
import { updateUserDB } from '../update.js';
import { getUserDependencyStatusDB, getUserStatusDB } from '../read.js';
import { createUserAuditLogDB } from '../create.js';
import { createAuditLogDBObject } from '../../../../dto/users/post.js';
import defaults from '../../../../defaults.js';
import APIError from '../../../errors/APIError.js';
import { StatusCodes } from 'http-status-codes';
import { handleProfilePhotoFile } from '../../../files/profilePhoto.js';

const updateUserTransactionDB = async (
  body: userPutRequestType,
  id: string,
  updatedBy: string = defaults.updatedById,
  request: Request
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        if (body.auditlog) {
          const currentDate = new Date(Date().toLocaleString()).toISOString();
          const userAuditLog = await getUserStatusDB(
            prismaTransaction,
            id,
            currentDate
          );
          if (body.auditlog?.status !== userAuditLog?.status) {
            if (body.auditlog.status === AuditLogStatusEnum.DEACTIVE) {
              const dependencyStatus = await getUserDependencyStatusDB(
                prismaTransaction,
                id
              );
              if (dependencyStatus) {
                throw new APIError(
                  'Cannot deactivate the user due to the dependent services assigned to the user',
                  StatusCodes.BAD_REQUEST,
                  'S'
                );
              }
            }

            const AuditLogDBObject = createAuditLogDBObject(body, id);
            if (AuditLogDBObject) {
              const createdAuditLog = await createUserAuditLogDB(
                prismaTransaction,
                AuditLogDBObject
              );
            }
          }
        }

        const userUpdateObject = updateUserDBObject(body, updatedBy);
        const updatedUser = await updateUserDB(
          prismaTransaction,
          userUpdateObject,
          id
        );

        if (updatedUser && request.file) {
          saveFile(updatedUser.id, request.file);
        }
        await handleProfilePhotoFile(
          prismaTransaction,
          request,
          true,
          updatedUser?.personId
        );

        return updatedUser;
      },
      {
        isolationLevel: defaults.transactionOptions.isolationLevel,
        maxWait: defaults.transactionOptions.maxWait,
        timeout: defaults.transactionOptions.timeout,
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export default updateUserTransactionDB;

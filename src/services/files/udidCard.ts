import { StatusCodes } from 'http-status-codes';
import prisma from '../database/database.js';
import APIError from '../errors/APIError.js';
import { cloudStorage } from '../s3/AWS_S3.js';
import { Folders } from './constants.js';
import { generateKey, getFile } from './utility.js';
import { updateUDIDCardKeyDB } from '../database/divyangDetails/update.js';
import { Request } from 'express';
import { Prisma } from '@prisma/client';

const handleUDIDCardFile = async (
  prismaTransaction: Prisma.TransactionClient,
  request: Request
) => {
  try {
    if (request.body.fileNames.UDIDCardFileName === null) {
      deleteUDIDCardFromCloud(prismaTransaction, request.body.personId);
    }
    if (!Array.isArray(request.files) && request.files) {
      const file = getFile(request.files, Folders.UDID_CARD);
      if (file) {
        updateUDIDCardToCloud(prismaTransaction, request.body.personId, file);
      }
    }
  } catch (error) {
    throw new APIError(
      'There was an error updating profile photo. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

const updateUDIDCardToCloud = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  file: Express.Multer.File
) => {
  try {
    const { key, folderPath } = generateKey(personId, file, Folders.UDID_CARD);
    const result = await updateUDIDCardKeyDB(prismaTransaction, personId, {
      UDIDCardKey: key,
      UDIDCardFileName: file.originalname,
    });
    const s3Result = await cloudStorage.uploadFile(file, key, folderPath);
    return result;
  } catch (error) {
    throw new APIError(
      'There was an error uploading UDID card. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

const deleteUDIDCardFromCloud = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string
) => {
  try {
    const result = await updateUDIDCardKeyDB(prismaTransaction, personId, {
      UDIDCardKey: null,
      UDIDCardFileName: null,
    });
    const folderPath = personId + '/' + Folders.UDID_CARD;
    const s3Result = await cloudStorage.deleteFolder(folderPath);
    return result;
  } catch (error) {
    throw new APIError(
      'There was an error deleting UDID card. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

export { handleUDIDCardFile };

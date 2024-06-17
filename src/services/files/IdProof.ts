import { Request } from 'express';
import { updateDivyangDetailsRequest } from '../../types/divyangDetails/divyangDetailsSchema.js';
import prisma from '../database/database.js';
import { cloudStorage } from '../s3/AWS_S3.js';
import { Folders, IdProofFileNameToFolderMap } from './constants.js';
import { generateKey, getFile } from './utility.js';
import APIError from '../errors/APIError.js';
import { StatusCodes } from 'http-status-codes';
import { updateDivyangDetailsByPersonIdDB } from '../database/divyangDetails/update.js';
import { getIDProofUploadsDBObject } from './IdProofDTO.js';
import { FilesType } from '../../types/files.js';
import { Prisma } from '@prisma/client';

const handleIdProofFiles = async (
  prismaTransaction: Prisma.TransactionClient,
  request: Request
) => {
  const requestDivyangdetails: updateDivyangDetailsRequest = request.body;
  const fileNames = requestDivyangdetails.IdProofUploads?.fileNames;
  if (fileNames) {
    for (const [key, value] of Object.entries(fileNames)) {
      const folder = IdProofFileNameToFolderMap.get(key);

      // delete file
      if (value === null) {
        const folderPath = requestDivyangdetails.personId + '/' + folder;
        await cloudStorage.deleteFolder(folderPath);
      }
      // update file
      else {
        if (!Array.isArray(request.files) && request.files) {
          await handleMultipleFilesUpdate(
            prismaTransaction,
            request.files,
            requestDivyangdetails.personId,
            folder
          );
        } else {
          throw new APIError(
            'Files are not properly sent',
            StatusCodes.BAD_REQUEST,
            'fileHandlingError',
            'S'
          );
        }
      }
    }
  }
};

const handleMultipleFilesUpdate = async (
  prismaTransaction: Prisma.TransactionClient,
  files: FilesType,
  personId: string,
  folder: Folders = Folders.DEFAULT
) => {
  const file = getFile(files, folder);
  if (file) {
    await updateIdProofUploadsFiles(prismaTransaction, personId, file, folder);
  } else {
    throw new APIError(
      'File not found in request',
      StatusCodes.BAD_REQUEST,
      'fileUploadError'
    );
  }
};
const updateIdProofUploadsFiles = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  file: Express.Multer.File,
  folder: Folders
) => {
  try {
    const { key, folderPath } = generateKey(personId, file, folder);
    const DBObject = getIDProofUploadsDBObject(folder, file.originalname, key);
    await updateDivyangDetailsByPersonIdDB(
      prismaTransaction,
      personId,
      DBObject
    );
    await cloudStorage.uploadFile(file, key, folderPath);
  } catch (error) {
    throw new APIError(
      'There was error in updating Id proof files',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'fileUploadError',
      'S'
    );
  }
};

export { handleIdProofFiles };

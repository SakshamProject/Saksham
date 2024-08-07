import { StatusCodes } from 'http-status-codes';
import { updateUserProfileKeyDB } from '../database/users/update.js';
import APIError from '../errors/APIError.js';
import { generateKey, getFile } from './utility.js';
import { cloudStorage } from '../s3/AWS_S3.js';
import { Folders } from './constants.js';
import { updateDivyangProfileKeyDB } from '../database/divyangDetails/update.js';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
const handleProfilePhotoFile = async (
  prismaTransaction: Prisma.TransactionClient,
  request: Request,
  isUser: Boolean,
  personId: string | undefined
) => {
  try {
    if (!personId) {
      throw new APIError('Person ID is not generated', StatusCodes.BAD_REQUEST);
    }
    if (isUser) {
      if (request.body.fileNames.profilePhotoFileName === 'null') {
        await deleteProfilePhotoFile(prismaTransaction, personId, isUser);
        return;
      }
    } else {
      if (
        request.body.personalDetails.fileNames.profilePhotoFileName === 'null'
      ) {
        await deleteProfilePhotoFile(prismaTransaction, personId, isUser);
        return;
      }
    }
    if (!Array.isArray(request.files) && request.files) {
      const file = getFile(request.files, Folders.PROFILE_PHOTO);
      if (file) {
        await updateProfilePhotoFile(prismaTransaction, personId, file, isUser);
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
const updateProfilePhotoFile = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  file: Express.Multer.File,
  isUser: Boolean
) => {
  try {
    const { key, folderPath } = generateKey(
      personId,
      file,
      Folders.PROFILE_PHOTO
    );
    if (isUser) {
      await updateUserProfileKeyDB(prismaTransaction, personId, {
        profilePhotoKey: key,
        profilePhotoFileName: file.originalname,
      });
    } else {
      await updateDivyangProfileKeyDB(prismaTransaction, personId, {
        profilePhotoKey: key,
        profilePhotoFileName: file.originalname,
      });
    }

    await cloudStorage.uploadFile(file, key, folderPath);
  } catch (error) {
    console.log(error);
    if (error instanceof APIError) throw error;
    else {
      throw new APIError(
        'There was an error uploading profile photo. Please try again.',
        StatusCodes.INTERNAL_SERVER_ERROR,
        'FileUploadError',
        'E'
      );
    }
  }
};

const deleteProfilePhotoFile = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  isUser: Boolean
) => {
  try {
    if (isUser) {
      await updateUserProfileKeyDB(prismaTransaction, personId, {
        profilePhotoKey: null,
        profilePhotoFileName: null,
      });
    } else {
      await updateDivyangProfileKeyDB(prismaTransaction, personId, {
        profilePhotoKey: null,
        profilePhotoFileName: null,
      });
    }
    const folderPath = personId + '/' + Folders.PROFILE_PHOTO;
    await cloudStorage.deleteFolder(folderPath);
  } catch (error) {
    throw new APIError(
      'There was an error deleting profile photo. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

export { handleProfilePhotoFile };

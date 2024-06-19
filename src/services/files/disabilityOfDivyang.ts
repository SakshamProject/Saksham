import { StatusCodes } from 'http-status-codes';
import APIError from '../errors/APIError.js';
import { cloudStorage } from '../s3/AWS_S3.js';
import { Folders } from './constants.js';
import { generateKeyForDisabilityCard, getFile } from './utility.js';
import { Request } from 'express';

const handleUpdateDisabilityCard = async (
  request: Request,
  personId: string,
  disabilityId: string
) => {
  if (!Array.isArray(request.files) && request.files) {
    const file = getFile(request.files, Folders.DISABILITY_CARDS);
    if (file) {
      return await updateDisabilityCardToCloud(personId, file, disabilityId);
    }
  }

  return null;
};

const updateDisabilityCardToCloud = async (
  personId: string,
  file: Express.Multer.File,
  disabilityId: string
) => {
  try {
    const { key, folderPath } = generateKeyForDisabilityCard(
      personId,
      file,
      disabilityId
    );
    const s3Result = await cloudStorage.uploadFile(file, key, folderPath);
    return key;
  } catch (error) {
    throw new APIError(
      'There was an error uploading Disability card. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

const deleteDisabilityCardFromCloud = async (
  personId: string,
  disabilityId: string
) => {
  try {
    const folderPath =
      personId + '/' + Folders.DISABILITY_CARDS + '/' + disabilityId;
    const s3Result = await cloudStorage.deleteFolder(folderPath);
  } catch (error) {
    throw new APIError(
      'There was an error deleting Disability card. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

export { handleUpdateDisabilityCard, deleteDisabilityCardFromCloud };

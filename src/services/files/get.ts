import { StatusCodes } from 'http-status-codes';
import APIError from '../errors/APIError.js';
import { cloudStorage } from '../s3/AWS_S3.js';
import { Folders, IdProofKeyToFolderMap, divyangKeysSet } from './constants.js';
import { Prisma } from '@prisma/client';
import { getDivyangDetailsType } from '../../types/divyangDetails/divyangDetailsSchema.js';
import { getUserType } from '../../types/users/usersSchema.js';

const getUserFiles = async (user: getUserType | undefined) => {
  try {
    if (user && user.profilePhotoKey) {
      const profilePhotoFile = await getFileFromCloud(user.profilePhotoKey);
      return { [Folders.PROFILE_PHOTO]: profilePhotoFile };
    }
  } catch (error) {
    throw error;
  }
};
const getDivyangFiles = async (
  divyangDetails: getDivyangDetailsType | undefined
) => {
  try {
    if (divyangDetails) {
      let files = {};
      for (const [key, value] of Object.entries(divyangDetails)) {
        if (divyangKeysSet.has(key) && value != null) {
          const file = await getFileFromCloud(value.toString());
          const fieldName = IdProofKeyToFolderMap.get(key) || 'default';
          files = { ...files, [fieldName]: file };
        }
      }
      const disabilityCards = await getDisabilityOfDivyangFiles(
        divyangDetails.disabilities
      );
      files = { ...files, [Folders.DISABILITY_CARDS]: disabilityCards };
      return files;
    }
  } catch (error) {
    throw error;
  }
};
const getDisabilityOfDivyangFiles = async (
  disabilities: Prisma.DisabilityOfDivyangGetPayload<{}>[]
) => {
  try {
    let files = {};
    for (const disability of disabilities) {
      if (disability.disabilityCardKey != null) {
        const card = await getFileFromCloud(disability.disabilityCardKey);
        files = { ...files, [disability.id]: card };
      }
    }
    return files;
  } catch (error) {
    throw new APIError(
      'There was an error retrieving disabilitycard files. Please try again.'
    );
  }
};

const getFileFromCloud = async (key: string) => {
  try {
    const response = await cloudStorage.getFile(key);
    return response;
  } catch (error) {
    throw new APIError(
      'There was an error retrieving File. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};
export { getDivyangFiles, getUserFiles, getDisabilityOfDivyangFiles };

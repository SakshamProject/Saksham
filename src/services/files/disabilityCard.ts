import { StatusCodes } from 'http-status-codes';
import { cloudStorage } from '../s3/AWS_S3.js';
import { Folders } from './constants.js';
import APIError from '../errors/APIError.js';
import { updateDivyangDetailsRequest } from '../../types/divyangDetails/divyangDetailsSchema.js';
import prisma from '../database/database.js';
import { generateKeyForDisabilityCard } from './utility.js';
import { updateDisabilityDetailsCardKey } from '../database/divyangDetails/update.js';
import { Prisma } from '@prisma/client';

const deleteDisabilityCardsCloud = async (
  disabilitiesToDelete: string[],
  personId: string
) => {
  try {
    for (const disability of disabilitiesToDelete) {
      const pathToDelete =
        personId + '/' + Folders.DISABILITY_CARDS + '/' + disability;
      await cloudStorage.deleteFolder(pathToDelete);
    }
  } catch (error) {
    throw new APIError(
      'There was an error deleting disabilitycard files. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};
const updateDisabilityCardsCloud = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangId: string,
  requestDivyangDetails: updateDivyangDetailsRequest,
  files: Express.Multer.File[]
) => {
  try {
    const disabilityCards =
      await prismaTransaction.disabilityOfDivyang.findMany({
        where: {
          divyangId: divyangId,
        },
      });
    for (const file of files) {
      if (requestDivyangDetails.disabilityDetails) {
        for (const card of requestDivyangDetails.disabilityDetails.disabilities)
          if (card.disabilityCardFileName === file.originalname) {
            const CardDB = disabilityCards.filter(
              (data) =>
                data.disabilityTypeId === card.disabilityTypeId &&
                data.disabilitySubTypeId === card.disabilitySubTypeId
            );
            const { key, folderPath } = generateKeyForDisabilityCard(
              requestDivyangDetails.personId,
              file,
              CardDB[0].id
            );
            const data: Prisma.DisabilityOfDivyangUpdateInput = {
              disabilityCardKey: key,
              disabilityCardFileName: file.originalname,
            };
            await updateDisabilityDetailsCardKey(
              prismaTransaction,
              CardDB[0].id,
              data
            );
            await cloudStorage.uploadFile(file, key, folderPath);
          }
      } else {
        //if no disabilities present
        const folderPath =
          requestDivyangDetails.personId + '/' + Folders.DISABILITY_CARDS;
        cloudStorage.deleteFolder(folderPath);
      }
    }
  } catch (error) {
    throw new APIError(
      'There was an error updating disability cards. Please try again.',
      StatusCodes.INTERNAL_SERVER_ERROR,
      'FileUploadError',
      'E'
    );
  }
};

export { deleteDisabilityCardsCloud, updateDisabilityCardsCloud };

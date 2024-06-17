import { Request } from 'express';
import { handleProfilePhotoFile } from './profilePhoto.js';
import { updateDivyangDetailsRequest } from '../../types/divyangDetails/divyangDetailsSchema.js';
import { handleIdProofFiles } from './IdProof.js';
import { handleUDIDCardFile } from './udidCard.js';
import { updateDisabilityCardsCloud } from './disabilityCard.js';
import { Folders } from './constants.js';
import { Prisma } from '@prisma/client';

const handleDivyangDetailsFiles = async (
  prismaTransaction: Prisma.TransactionClient,
  request: Request
) => {
  try {
    const divyangDetails: updateDivyangDetailsRequest = request.body;
    if (divyangDetails.pageNumber === 1) {
      await handleProfilePhotoFile(
        prismaTransaction,
        request,
        false,
        request.body.personalDetails.personId
      );
    }
    if (divyangDetails.pageNumber === 2) {
      await handleIdProofFiles(prismaTransaction, request);
    }
    if (divyangDetails.pageNumber === 3) {
      await handleUDIDCardFile(prismaTransaction, request);

      if (!Array.isArray(request.files) && request.files) {
        const disabilitiesFiles = request.files[`${Folders.DISABILITY_CARDS}`];
        await updateDisabilityCardsCloud(
          prismaTransaction,
          divyangDetails.id,
          request.body,
          disabilitiesFiles
        );
      }
    }
  } catch (error) {
    throw error;
  }
};

export { handleDivyangDetailsFiles };

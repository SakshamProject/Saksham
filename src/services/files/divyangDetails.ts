import { Request } from 'express';
import { handleProfilePhotoFile } from './profilePhoto.js';
import {
  updateDivyangDetailsRequest,
  updateDivyangDetailsRequestSchema,
} from '../../types/divyangDetails/divyangDetailsSchema.js';
import { handleIdProofFiles } from './IdProof.js';
import { handleUDIDCardFile } from './udidCard.js';
import { Prisma } from '@prisma/client';

const handleDivyangDetailsFiles = async (
  prismaTransaction: Prisma.TransactionClient,
  request: Request
) => {
  try {
    const divyangDetails: updateDivyangDetailsRequest =
      updateDivyangDetailsRequestSchema.parse(request.body);

    if (divyangDetails.pageNumber === 1) {
      if (request.body.personalDetails.fileNames === undefined) {
        console.log('no filenames');
        return;
      }
      await handleProfilePhotoFile(
        prismaTransaction,
        request,
        false,
        request.body.personalDetails.personId
      );
    }
    if (divyangDetails.pageNumber === 2) {
      if (request.body.IdProofUploads.fileNames === undefined) {
        console.log('no filenames');

        return;
      }
      await handleIdProofFiles(prismaTransaction, request);
    }
    if (divyangDetails.pageNumber === 4) {
      if (request.body.disabilityDetails.fileNames === undefined) {
        console.log('no filenames');
        return;
      }
      await handleUDIDCardFile(prismaTransaction, request);
    }
  } catch (error) {
    throw error;
  }
};

export { handleDivyangDetailsFiles };

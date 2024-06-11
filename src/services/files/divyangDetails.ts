import { Request } from "express";
import { handleProfilePhotoFile } from "./profilePhoto.js";
import { updateDivyangDetailsRequest } from "../../types/divyangDetails/divyangDetailsSchema.js";
import { handleIdProofFiles } from "./IdProof.js";
import { handleUDIDCardFile } from "./udidCard.js";
import { updateDisabilityCardsCloud } from "./disabilityCard.js";
import { Folders } from "./constants.js";

const handleDivyangDetailsFiles = async (request: Request) => {
  try {
    const divyangDetails: updateDivyangDetailsRequest = request.body;
    if (divyangDetails.pageNumber === 1) {
      await handleProfilePhotoFile(request, false);
    }
    if (divyangDetails.pageNumber === 2) {
      await handleIdProofFiles(request);
    }
    if (divyangDetails.pageNumber === 3) {
      await handleUDIDCardFile(request);

      if (!Array.isArray(request.files) && request.files) {
        const disabilitiesFiles = request.files[`${Folders.DISABILITY_CARDS}`];
        await updateDisabilityCardsCloud(
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

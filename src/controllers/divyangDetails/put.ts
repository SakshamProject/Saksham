import {NextFunction, Request, Response} from "express";
import {
    updateDivyangDetailsRequest,
    updateDivyangDetailsRequestSchema,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import {createResponseWithFiles} from "../../types/createResponseSchema.js";
import updateDivyangDetailsTransactionDB from "../../services/database/divyangDetails/transaction/update.js";
import {getDivyangDetailsByIdDB} from "../../services/database/divyangDetails/read.js";
import APIError from "../../services/errors/APIError.js";
import {StatusCodes} from "http-status-codes";
import {
    deleteDivyangDetailsProfilePhotoFromS3andDB,
    deleteUDIDCardFromS3andDB,
    disabilityCardsResponse,
    filesResponse,
    getDivyangDetailsDisabilityCardsFileURLS,
    getDivyangDetailsIDProofFileURLs,
    saveDivyangDetailsIdProofFilestoS3andDB,
    updateDivyangDisabilityCardsToS3andDB,
    saveDivyangProfilePhotoToS3andDB,
    saveUDIDCardToS3andDB,
} from "../../services/files/files.js";
import log from "../../services/logger/logger.js";

const putDivyangDetails = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const id: string = request.params.id;
        log("info", "[putDivyangDetails]: %o", request.body);
        const divyangDetails: updateDivyangDetailsRequest =
            updateDivyangDetailsRequestSchema.parse(request.body);

        const pageNumber = divyangDetails.pageNumber;

        const updatedBy = request.token?.personId;
        const updatedResult = await updateDivyangDetailsTransactionDB(
            divyangDetails,
            updatedBy,
            id
        );

        log("info", "[putDivyangDetails]: request.files: %o", request.files);
        let fileURLs: filesResponse | undefined = [];
        let disabilityCardURLs: disabilityCardsResponse | undefined = [];
        if (updatedResult) {
            const personId = updatedResult?.personId;
            if (pageNumber === 1) {
                if (request.files) {
                    if (!Array.isArray(request.files)) {
                        const files = request.files;
                        // Profile Photo Only
                        if (files["profilePhoto"]) {
                            await saveDivyangProfilePhotoToS3andDB(
                                personId,
                                files["profilePhoto"][0]
                            );
                        } else {
                            if (!divyangDetails.personalDetails?.profilePhotoFile) {
                                await deleteDivyangDetailsProfilePhotoFromS3andDB(personId);
                            }
                        }
                    }
                }
            }

            if (pageNumber === 2) {
                if (request.files) {
                    if (!Array.isArray(request.files)) {
                        const files = request.files;
                        // ID Proof Uploads
                        if (Object.keys(files).length < 2) {
                            throw new APIError(
                                "Atlease 2 Files must be uploaded!",
                                StatusCodes.BAD_REQUEST,
                                "FileUploadError",
                                "E"
                            );
                        }

                        await saveDivyangDetailsIdProofFilestoS3andDB(
                            updatedResult?.personId,
                            files,
                            divyangDetails
                        );
                    }
                }
            }

            if (pageNumber === 4) {
                if (request.files) {
                    if (!Array.isArray(request.files)) {
                        const files = request.files;
                        // Disability Details

                        // UDID Card
                        if (request.files["UDIDCard"]) {
                            const s3Result = await saveUDIDCardToS3andDB(
                                personId,
                                request.files["UDIDCard"][0]
                            );
                            log("info", "[putDivyangDetails]: s3Result: %o", s3Result);
                        } else {
                            if (!divyangDetails.disabilityDetails?.UDIDCardFile) {
                                const s3Result = await deleteUDIDCardFromS3andDB(personId);
                                log("info", "[putDivyangDetails]: s3Result: %o", s3Result);
                            }
                        }

                        // Disability Card
                        if (request.files["disabilityCard"]?.length > 0) {
                            await updateDivyangDisabilityCardsToS3andDB(
                                divyangDetails,
                                request.files["disabilityCard"],
                                personId
                            );
                        }
                    }
                }
            }

        }
        if (updatedResult && updatedResult.personId) {
            const personId = updatedResult.personId;
            fileURLs = await getDivyangDetailsIDProofFileURLs(personId);
            disabilityCardURLs = await getDivyangDetailsDisabilityCardsFileURLS(
                personId
            );
        }
        log("info", "[putDivyangDetails]: fileURLs: %o", fileURLs);
        log(
            "info",
            "[putDivyangDetails]: disabilityCardURLs: %o",
            disabilityCardURLs
        );

        const result = await getDivyangDetailsByIdDB(id);
        const responseData = createResponseWithFiles(
            result,
            fileURLs,
            disabilityCardURLs
        );
        response.send(responseData);
    } catch (error) {
        next(error);
    }
};

export {putDivyangDetails};

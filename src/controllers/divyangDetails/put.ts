import {NextFunction, Request, Response} from "express";
import {
    updateDivyangDetailsRequest,
    updateDivyangDetailsRequestSchema,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import {createResponseOnlyData, createResponseWithFiles} from "../../types/createResponseSchema.js";
import updateDivyangDetailsTransactionDB from "../../services/database/divyangDetails/transaction/update.js";
import {getDivyangDetailsByIdDB} from "../../services/database/divyangDetails/read.js";
import APIError from "../../services/errors/APIError.js";
import {StatusCodes} from "http-status-codes";
import {
    filesResponse,
    getDivyangDetailsFileURLs,
    saveDivyangDetailsIdProofFilestoS3andDB,
    saveDivyangProfilePhotoToS3andDB
} from "../../services/files/files.js";
import log from "../../services/logger/logger.js";

const putDivyangDetails = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const id: string = request.params.id;
        const divyangDetails: updateDivyangDetailsRequest =
            updateDivyangDetailsRequestSchema.parse(request.body);

        const pageNumber = divyangDetails.pageNumber;

        const updatedBy = request.token?.personId;
        const updatedResult = await updateDivyangDetailsTransactionDB(
            divyangDetails,
            updatedBy,
            id
        );

        let fileURLs: filesResponse  | undefined = [];
        if (updatedResult) {
            const personId = updatedResult?.personId;
            if (request.files) {
                if (!(Array.isArray(request.files))) {
                    const files = request.files;

                    if (pageNumber === 1) {
                        // Profile Photo Only
                        if (files["profilePhoto"][0]) {
                            await saveDivyangProfilePhotoToS3andDB(personId, files["profilePhoto"][0]);
                        }
                    }

                    if (pageNumber === 2) {
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
                        );
                    }

                    if (pageNumber === 4) {
                        // Disability Details
                    }

                    fileURLs = await getDivyangDetailsFileURLs(personId);
                }
            }
        }
        log("info", "[putDivyangDetails]: fileURLs: %o", fileURLs);

        const result = await getDivyangDetailsByIdDB(id);
        const responseData = createResponseWithFiles(result, fileURLs);
        response.send(responseData);

    } catch (error) {
        next(error);
    }
};

export {putDivyangDetails};

import prisma from "../database/database.js"
import {updateUserProfileKeyDB} from "../database/users/update.js"
import {
    deleteFile,
    generateDisablityCardFileKey,
    generateFileURLResponseFromKey,
    generateFileURLResponseFromResult,
    generateFileURLsResponseFromResult,
    generateKey,
    saveDisabilityCardFileBufferToS3,
    saveFileBuffersToS3,
    saveFileBufferToS3,
} from "../s3/s3.js"
import APIError from "../errors/APIError.js"
import {StatusCodes} from "http-status-codes"
import {
    divayangDetailsUpdateFileKeysDB,
    saveDisabilityDetailsCardKey,
    updateDivyangProfileKeyDB,
    updateUDIDCardKeyDB
} from "../database/divyangDetails/update.js";
import log from "../logger/logger.js";
import {
    getDivyangDetailsByIdDB,
    getDivyangDetailsByPersonIdDB,
    getDivyangDisabilitiesByPersonIdDB
} from "../database/divyangDetails/read.js";
import {getUserByPersonIdDB} from "../database/users/read.js";
import {updateDivyangDetailsRequest} from "../../types/divyangDetails/divyangDetailsSchema.js";
import throwDatabaseError from "../database/utils/errorHandler.js";

async function getDivyangDetailsDisabilityCardsFileURLS(personId: string) {
    const disabilityCards: {
        [id: string]: { key: string, url: string, validUpto: string, expiresInSeconds: number }
    }[] = []
    const disabilities = await getDivyangDisabilitiesByPersonIdDB(prisma, personId);
    if (disabilities) {
        for (const disability of disabilities) {
            if (disability.disabilityCardFile && disability.id) {
                const fileURL = await generateFileURLResponseFromKey(disability.disabilityCardFile);
                if (fileURL) {
                    disabilityCards.push({
                        [disability.id]: fileURL
                    });
                }
            }
        }
    }
    return disabilityCards;
}

async function getDivyangDetailsIDProofFileURLs(personId: string) {
    try {
        const divyangDetails = await getDivyangDetailsByPersonIdDB(personId) as { [key: string]: any };
        log("info", "[getDivyangDetailsFileURLs]: divyangDetails: %o", divyangDetails)
        const imageColumns = [
            "picture",
            "voterIdFile",
            "panCardFile",
            "drivingLicenseFile",
            "rationCardFile",
            "aadharCardFile",
            "pensionCardFile",
            "medicalInsuranceCardFile",
            "disabilitySchemeCardFile",
            "BPL_OR_APL_CardFile",
            "UDIDCardFile"
        ];

        const columnNameFieldNameMap: Map<string, string> = new Map();

        columnNameFieldNameMap.set("picture", "profilePhoto");
        columnNameFieldNameMap.set("voterIdFile", "voterId");
        columnNameFieldNameMap.set("panCardFile", "panCard");
        columnNameFieldNameMap.set("drivingLicenseFile", "drivingLicense");
        columnNameFieldNameMap.set("rationCardFile", "rationCard");
        columnNameFieldNameMap.set("aadharCardFile", "aadharCard");
        columnNameFieldNameMap.set("pensionCardFile", "pensionCard");
        columnNameFieldNameMap.set("medicalInsuranceCardFile", "medicalInsuranceCard");
        columnNameFieldNameMap.set("disabilitySchemeCardFile", "disabilitySchemeCard");
        columnNameFieldNameMap.set("BPL_OR_APL_CardFile", "BPL_OR_APL_Card");
        columnNameFieldNameMap.set("UDIDCardFile", "UDIDCard");

        if (divyangDetails) {
            const files: filesResponse = []

            for (const column of imageColumns) {
                const field = columnNameFieldNameMap.get(column);
                if (field) {
                    console.log(typeof column);
                    const key = divyangDetails[column];
                    if (key) {
                        const fileURL = await generateFileURLResponseFromKey(key)
                        if (fileURL) {
                            files.push({
                                [field]: fileURL
                            });
                        }
                    }
                }
            }


            log("info", "[getDivyangDetailsFileURLs]: files %o", files);
            return files;
        }
    } catch (error) {
        log("error", "[getDivyangDetailsFileURLs]: %o", error);
    }
}

async function saveDivyangProfilePhotoToS3andDB(
    personId: string,
    file: Express.Multer.File,
) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {
            const key = generateKey(personId, file)
            const result = await updateDivyangProfileKeyDB(prisma, personId, {
                // pictureFileName: file.originalname;
                profilePhotoFile: key,
                profilePhotoFileName: file.originalname,
            });
            log("info", "[saveDivyangProfilePhotoToS3andDB]: result: %o", result);
            const s3Result = await saveFileBufferToS3(personId, file)
            if (s3Result) {
                return await generateFileURLResponseFromResult(s3Result)
            }
        })
        return transaction
    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E",
        )
    }
}

async function deleteDivyangDetailsProfilePhotoFromS3andDB(personId: string) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {
            const user = await getDivyangDetailsByPersonIdDB(personId);
            const key = user?.profilePhotoFile;
            const result = await updateDivyangProfileKeyDB(prisma, personId, {
                profilePhotoFile: null,
                profilePhotoFileName: null,
            });
            log("info", "[deleteDivyangDetailsProfilePhotoFromS3andDB]: result: %o", result);

            if (key) {
                const s3Result = await deleteFile(key);
                if (s3Result) {
                    return s3Result;
                }
            }
        })
        return transaction

    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E",
        );
    }
}

async function deleteUserProfilePhotoFromS3andDB(personId: string) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {
            const user = await getUserByPersonIdDB(personId);
            const key = user?.profilePhotoFile;
            const result = await updateUserProfileKeyDB(prisma, personId, {
                profilePhotoFile: null,
                profilePhotoFileName: null,
            });
            log("info", "[deleteUserProfilePhotoFromS3andDB]: result: %o", result);
            if (key) {
                const s3Result = await deleteFile(key);
                if (s3Result) {
                    return s3Result;
                }
            }
        })
        return transaction

    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E",
        );
    }
}

async function saveUserProfilePhotoToS3andDB(
    personId: string,
    file: Express.Multer.File,
) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {
            const key = generateKey(personId, file)
            const result = await updateUserProfileKeyDB(prisma, personId, {
                profilePhotoFile: key,
                profilePhotoFileName: file.originalname
            });
            log("info", "[saveUserProfilePhotoToS3AndDB]: result: %o", result);
            const s3Result = await saveFileBufferToS3(personId, file)
            if (s3Result) {
                return await generateFileURLResponseFromResult(s3Result);
            }
        })
        return transaction
    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E",
        )
    }
}

function IdProofFieldNameColumnNameMapper(files: { [fieldName: string]: Express.Multer.File[] }, personId: string) {
    const IdProofFieldNameColumnNameMap: Map<string, string> = new Map();
    IdProofFieldNameColumnNameMap.set("voterId", "voterIdFile");
    IdProofFieldNameColumnNameMap.set("panCard", "panCardFile");
    IdProofFieldNameColumnNameMap.set("rationCard", "rationCardFile");
    IdProofFieldNameColumnNameMap.set("drivingLicense", "drivingLicenseFile");
    IdProofFieldNameColumnNameMap.set("pensionCard", "pensionCardFile");
    IdProofFieldNameColumnNameMap.set("medicalInsuranceCard", "medicalInsuranceCardFile");
    IdProofFieldNameColumnNameMap.set("disabilitySchemeCard", "disabilitySchemeCardFile");
    IdProofFieldNameColumnNameMap.set("BPL_OR_APL_Number", "BPL_OR_APL_CardFile");


    const IdProofFileNameColumnNameMap: Map<string, string> = new Map();
    IdProofFileNameColumnNameMap.set("voterId", "voterIdFileName");
    IdProofFileNameColumnNameMap.set("panCard", "panCardFileName");
    IdProofFileNameColumnNameMap.set("rationCard", "rationCardFileName");
    IdProofFileNameColumnNameMap.set("drivingLicense", "drivingLicenseFileName");
    IdProofFileNameColumnNameMap.set("pensionCard", "pensionCardFileName");
    IdProofFileNameColumnNameMap.set("medicalInsuranceCard", "medicalInsuranceCardFileName");
    IdProofFileNameColumnNameMap.set("disabilitySchemeCard", "disabilitySchemeCardFileName");
    IdProofFileNameColumnNameMap.set("BPL_OR_APL_Number", "BPL_OR_APL_CardFileName");

    const data: any = {}; // I can"t do this! Cries~ Without using `any` *sobs*
    log("info", "[IdProofFileNameColumnNameMapper]: Keys: %o", IdProofFieldNameColumnNameMap.keys());
    for (const field of IdProofFieldNameColumnNameMap.keys()) {
        const columnName = IdProofFieldNameColumnNameMap.get(field);
        const fileNameColumn = IdProofFileNameColumnNameMap.get(field);
        if (columnName && fileNameColumn) {
            if (files[field]) {
                const file = files[field][0];
                data[columnName] = generateKey(personId, file);
                data[fileNameColumn] = file.originalname;
            } else {
                data[columnName] = null;
                data[fileNameColumn] = null;
            }
        }
    }
    return data;
}

export type filesResponse = {
    [field: string]: { key: string, url: string, validUpto: string, expiresInSeconds: number },
}[];

export type disabilityCardsResponse = {
    [id: string]: { key: string, url: string, validUpto: string, expiresInSeconds: number },
}[];

async function saveDivyangDetailsIdProofFilestoS3andDB(
    personId: string,
    files: { [fieldname: string]: Express.Multer.File[] },
): Promise<filesResponse | undefined> {
    try {
        // WARN: Even if 1 file upload fails all keys are not updated
        const transaction = prisma.$transaction(async (prisma) => {
            const data = IdProofFieldNameColumnNameMapper(files, personId)
            log("info", "[saveDivyangDetailsFilestoS3andDB]: data: %o", data);
            const result = await divayangDetailsUpdateFileKeysDB(prisma, personId, data);
            const s3Result = await saveFileBuffersToS3(personId, files)
            if (s3Result) {
                return await generateFileURLsResponseFromResult(s3Result)
            }
        });
        return transaction
    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E",
        )
    }
}

async function deleteAllDisabilityCardsToS3andDB(personId: string) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {

            const existingDisabilities = await getDivyangDisabilitiesByPersonIdDB(
                prisma,
                personId);

            log("info", "[deleteAllDisabilityCardsToS3andDB]: divyangDetails: %o", existingDisabilities);

            if (existingDisabilities) {
                for (const existingDisability of existingDisabilities) {
                    if (existingDisability.disabilityCardFile || existingDisability.disabilityCardFileName) {
                        const keyToDelete = existingDisability.disabilityCardFile;
                        const dbResult = await saveDisabilityDetailsCardKey(prisma, existingDisability.id, {
                            disabilityCardFile: null,
                            disabilityCardFileName: null
                        });
                        log("info", "[deleteAllDisabilityCardsToS3andDB]: dbResult: %o", dbResult);
                        if (keyToDelete) {
                            const s3Result = deleteFile(keyToDelete);
                            log("info", "[deleteAllDisabilityCardsToS3andDB]: s3Result: %o", s3Result);

                        }
                    }
                }
            }
        });
        return transaction;
    } catch (error) {
        throwDatabaseError(error);
    }
}

async function deleteUDIDCardFromS3andDB(personId: string) {
    try {

        const transaction = prisma.$transaction(async (prisma) => {
            const divyang = await getDivyangDetailsByPersonIdDB(personId);
            if (divyang) {
                const key = divyang.UDIDCardFile;
                if (divyang?.UDIDCardFile) {
                    const dbResult = await updateUDIDCardKeyDB(prisma, personId, {
                        UDIDCardFile: null,
                        UDIDCardFileName: null,
                    });
                    log("info", "[deleteUDIDCardFromS3andDB]: dbResult: %o", dbResult);
                    if (key) {
                        const s3Result = await deleteFile(key)
                        log("info", "[deleteUDIDCardFromS3andDB]: s3Result: %o", s3Result);
                    }
                }
            }
        });
        return transaction;
    } catch(error) {
        throwDatabaseError(error);
    }

}
async function saveUDIDCardToS3andDB(personId: string, file: Express.Multer.File) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {
            const key = generateKey(personId, file);
            const dbResult = await updateUDIDCardKeyDB(prisma, personId, {
                UDIDCardFile: key,
                UDIDCardFileName: file.originalname,
            });
            log("info", "[saveUDIDCardToS3andDB]: dbResult: %o", dbResult);

            const s3Result = saveFileBufferToS3(personId, file);
            log("info", "[saveUDIDCardToS3andDB]: s3Result: %o", s3Result);
        });
        return transaction;
    } catch (error) {
        throwDatabaseError(error);
    }
}

async function saveDivyangDisabilityCardsToS3andDB(divyangDetails: updateDivyangDetailsRequest, files: Express.Multer.File[], personId: string) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {

            log("info", "[saveDivyangDisabilityDetailsToS3andDB]: divyangDetails: %o", divyangDetails);

            const existingDisabilities = await getDivyangDisabilitiesByPersonIdDB(
                prisma,
                personId
            );

            log("info", "[saveDivyangDisabilityDetailsToS3andDB]: existingDisabilities: %o", existingDisabilities);
            const disabilities = divyangDetails.disabilityDetails?.disabilities;
            log("info", "[saveDivyangDisabilityDetailsToS3andDB]: disabilities: %o", disabilities);
            if (disabilities) {
                for (const disability of disabilities) {
                    if (existingDisabilities) {

                        for (const existingDisability of existingDisabilities) {
                            if (disability.disabilityTypeId === existingDisability.disabilityTypeId && (
                                disability.disabilitySubTypeId ?
                                    disability.disabilitySubTypeId === existingDisability.disabilitySubTypeId : true

                            )) {

                                const requestCardName = disability.disabilityCardFileName;
                                log("info", "[saveDivyangDisabilityDetailsToS3andDB]: requestCardName: %o", requestCardName);
                                if (requestCardName) {
                                    for (const file of files) {
                                        if (requestCardName === file.originalname) {
                                            const key = generateDisablityCardFileKey(personId, file, existingDisability.id);

                                            if (existingDisability.id) {
                                                console.log(`Enters disability.id`)
                                                // save key to db
                                                const dbResult = await saveDisabilityDetailsCardKey(prisma, existingDisability.id, {
                                                    disabilityCardFileName: file.originalname,
                                                    disabilityCardFile: key
                                                });
                                                const s3Result = await saveDisabilityCardFileBufferToS3(personId, file, existingDisability.id)

                                                log("info", "[saveDivyangDisabilityDetailsToS3andDB]: dbResult: %o", dbResult);
                                                log("info", "[saveDivyangDisabilityDetailsToS3andDB]: s3Result: %o", s3Result);

                                            }
                                        }
                                    }
                                } else {
                                    if (existingDisability.id) {
                                        const keyToDelete = existingDisability.disabilityCardFile;
                                        const dbResult = await saveDisabilityDetailsCardKey(prisma, existingDisability.id, {
                                            disabilityCardFile: null,
                                            disabilityCardFileName: null
                                        });
                                        if (keyToDelete) {
                                            const s3Result = deleteFile(keyToDelete);
                                            log("info", "[saveDivyangDisabilityDetailsToS3andDB]: s3Result: %o", s3Result);
                                        }
                                        log("info", "[saveDivyangDisabilityDetailsToS3andDB]: dbResult: %o", dbResult);
                                    }
                                }
                            }
                        }
                    }
                }
            }

        });
        return transaction

    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E",
        );
    }
}

export {
    saveUserProfilePhotoToS3andDB,
    getDivyangDetailsIDProofFileURLs,
    saveDivyangDetailsIdProofFilestoS3andDB,
    saveDivyangProfilePhotoToS3andDB,
    deleteUserProfilePhotoFromS3andDB,
    deleteDivyangDetailsProfilePhotoFromS3andDB,
    saveDivyangDisabilityCardsToS3andDB,
    getDivyangDetailsDisabilityCardsFileURLS,
    deleteAllDisabilityCardsToS3andDB,
    saveUDIDCardToS3andDB,
    deleteUDIDCardFromS3andDB,
}
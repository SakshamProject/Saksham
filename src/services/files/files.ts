import prisma from "../database/database.js"
import {updateUserProfileKeyDB} from "../database/users/update.js"
import {
    deleteFile,
    generateFileURLResponseFromKey,
    generateFileURLResponseFromResult,
    generateFileURLsResponseFromResult,
    generateKey,
    saveFileBuffersToS3,
    saveFileBufferToS3,
} from "../s3/s3.js"
import APIError from "../errors/APIError.js"
import {StatusCodes} from "http-status-codes"
import {divayangDetailsUpdateFileKeysDB, updateDivyangProfileKeyDB} from "../database/divyangDetails/update.js";
import log from "../logger/logger.js";
import {getDivyangDetailsByPersonIdDB} from "../database/divyangDetails/read.js";
import {getUserByPersonIdDB} from "../database/users/read.js";

async function getDivyangDetailsFileURLs(personId: string) {
    try {
        const divyangDetails = await getDivyangDetailsByPersonIdDB(personId) as {[key: string]: any};
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

        if (divyangDetails) {
            const files: filesResponse = []
            for (const column of imageColumns) {
                const field = columnNameFieldNameMap.get(column);
                if (field) {
                    console.log(typeof column);
                    const key = divyangDetails[column];
                    log("info", "[getDivyangDetailsFileURLs]: column: %s", key)
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
    }
    catch (error) {
        log("error", "[getDivyangDetailsFileURLs]: %o", error);
    }
}

async function saveDivyangProfilePhotoToS3andDB(
    personId: string,
    file: Express.Multer.File,
) {
    try {
        const transaction = prisma.$transaction(async (prisma) => {
            try {
                const key = generateKey(personId, file)
                const result = await updateDivyangProfileKeyDB(prisma, personId, {
                    picture: key,
                })
                log("info", "[saveDivyangProfilePhotoToS3andDB]: result: %o", result);
                const s3Result = await saveFileBufferToS3(personId, file)
                if (s3Result) {
                    return await generateFileURLResponseFromResult(s3Result)
                }
            } catch (error) {

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
            const key = user?.picture;
            const result = await updateDivyangProfileKeyDB(prisma, personId, {
                picture: null,
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
            const key = user?.picture;
            const result = await updateUserProfileKeyDB(prisma, personId, {
                picture: null,
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
                picture: key,
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

    const data: any = {}; // I can"t do this! Cries~ Without using `any` *sobs*
    log("info", "[IdProofFieldNameColumnNameMapper]: Keys: %o", IdProofFieldNameColumnNameMap.keys());
    for (const field of IdProofFieldNameColumnNameMap.keys()) {
        const columnName = IdProofFieldNameColumnNameMap.get(field);
        if (columnName) {
            if (files[field]) {
                data[columnName] = generateKey(personId, files[field][0]);
            } else {
                data[columnName] = null; // Soft Delete the File
            }
        }
    }
    return data;
}

export type filesResponse = { [field: string]: {key: string, url: string, validUpto: string, expiresInSeconds: number}}[];
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

export {
    saveUserProfilePhotoToS3andDB,
    getDivyangDetailsFileURLs,
    saveDivyangDetailsIdProofFilestoS3andDB,
    saveDivyangProfilePhotoToS3andDB,
    deleteUserProfilePhotoFromS3andDB,
    deleteDivyangDetailsProfilePhotoFromS3andDB
}

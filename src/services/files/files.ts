import { Prisma } from "@prisma/client";
import prisma from "../database/database.js";
import {updateProfileKeyDB} from "../database/users/update.js";
import {
    generateFileURLResponseFromResult,
    generateFileURLsResponseFromResult,
    generateKey,
    saveFileBuffersToS3,
    saveFileBufferToS3
} from "../s3/s3.js";
import APIError from "../errors/APIError.js";
import {StatusCodes} from "http-status-codes";

async function saveProfilePhotoToS3andDB(personId: string,file: Express.Multer.File) {
    try {
        const transaction = prisma.$transaction(
            async (prisma) => {
                const key = generateKey(personId, file);
                const result = await updateProfileKeyDB(prisma, personId, {
                    picture: key
                });
                const s3Result = await saveFileBufferToS3(personId, file);
                if (s3Result) {
                    return (
                        await generateFileURLResponseFromResult(s3Result)
                    );
                }
            }
        );
        // return transaction;
    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E"
        );
    }
}

async function saveDivyangDetailsFilestoS3andDB(personId: string, files: { [fieldname: string]: Express.Multer.File[] }, data: Prisma.DivyangDetailsUpdateInput) {
    try {
        // WARN: Even if 1 file upload fails all keys are not updated
        const transaction = prisma.$transaction(
            async (prisma) => {
                // const result = await divayangDetailsUpdateFileKeysDB(prisma, personId, data);
                const s3Result = await saveFileBuffersToS3(personId, files);
                if (s3Result) {
                    return (
                        await generateFileURLsResponseFromResult(s3Result)
                    );
                }
            }
        );
        // return transaction;
    } catch (error) {
        throw new APIError(
            "There was an error uploading your files. Please try again.",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FileUploadError",
            "E"
        );
    }
}


export { saveProfilePhotoToS3andDB, saveDivyangDetailsFilestoS3andDB };
import { StatusCodes } from "http-status-codes";
import prisma from "../database/database.js";
import { updateUserProfileKeyDB } from "../database/users/update.js";
import APIError from "../errors/APIError.js";
import { aws_s3 } from "../s3/AWS_S3.js";
import { generateKey } from "./utility.js";

async function saveUserProfilePhotoToS3andDB(
  personId: string,
  file: Express.Multer.File
) {
  try {
    const transaction = prisma.$transaction(async (prisma) => {
      const { key, folderPath } = generateKey(personId, file);
      const result = await updateUserProfileKeyDB(prisma, personId, {
        profilePhotoFile: key,
        profilePhotoFileName: file.originalname,
      });

      const s3Result = await aws_s3.uploadFile(file, key, folderPath);
      if (s3Result) {
        return await aws_s3.getFile(key);
      }
    });
    return transaction;
  } catch (error) {
    throw new APIError(
      "There was an error uploading profile photo. Please try again.",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "FileUploadError",
      "E"
    );
  }
}

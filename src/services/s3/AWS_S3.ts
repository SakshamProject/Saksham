import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectsCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
  NoSuchBucket,
  NoSuchKey,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import config from "../../../config.js";
import APIError from "../errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import defaults from "../../defaults.js";

class AWS_S3 {
  s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: config.s3.access_key,
        secretAccessKey: config.s3.secret_key,
      },
      region: config.s3.default_region,
    });
  }
  async uploadFile(file: Express.Multer.File, key: string, folderPath: string) {
    try {
      //To delete file if exist
      this.deleteFolder(folderPath);

      const params: PutObjectCommandInput = {
        Bucket: config.s3.bucket_name,
        Key: key,
        Body: file.buffer,
      };
      const putObjectCommand = new PutObjectCommand(params);
      const output = await this.s3Client.send(putObjectCommand);
      return output;
    } catch (error) {
      throw this.throwS3Error(error);
    }
  }
  async deleteFolder(folderPath: string) {
    try {
      const listedObjects: ListObjectsV2CommandOutput | undefined =
        await this.getObjectsInFolder(folderPath);
      if (listedObjects && listedObjects.Contents) {
        if (listedObjects.Contents.length === 0) {
          console.log("No objects found for the prefix");
          return;
        }

        const deleteParams = {
          Bucket: config.s3.bucket_name,
          Delete: {
            Objects: listedObjects.Contents.map(({ Key }) => ({ Key })),
          },
        };

        const deleteCommand = new DeleteObjectsCommand(deleteParams);
        const deleteResponse = await this.s3Client.send(deleteCommand);
        console.log("Successfully deleted objects:", deleteResponse.Deleted);
        return deleteResponse;
      } else {
        console.log("Else - No objects found for the prefix");
      }
    } catch (error) {
      this.throwS3Error(error);
    }
  }
  async getFile(key: string) {
    try {
      const params: GetObjectCommandInput = {
        Bucket: config.s3.bucket_name,
        Key: key,
      };
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: defaults.s3.expiresIn,
      });
      return {
        url,
        createdAt: new Date(),
        expiresInSeconds: defaults.s3.expiresIn,
      };
    } catch (error) {
      this.throwS3Error(error);
    }
  }
  //remove if not need
  private async deleteFile(key: string) {
    try {
      const params: DeleteObjectCommandInput = {
        Bucket: config.s3.bucket_name,
        Key: key,
      };
      const deleteObjectCommand = new DeleteObjectCommand(params);
      const output = await this.s3Client.send(deleteObjectCommand);
      return output;
    } catch (error) {
      this.throwS3Error(error);
    }
  }
  private async getObjectsInFolder(folderPath: string) {
    try {
      const params: ListObjectsV2CommandInput = {
        Bucket: config.s3.bucket_name,
        Prefix: folderPath,
      };
      const listObjectsV2Command = new ListObjectsV2Command(params);
      const response = await this.s3Client.send(listObjectsV2Command);
      return response;
    } catch (error) {
      this.throwS3Error(error);
    }
  }
  private throwS3Error(error: any) {
    if (error instanceof Error) {
      if (error instanceof S3ServiceException) {
        if (error instanceof NoSuchBucket) {
          throw new APIError(
            "There is no such S3 Bucket!",
            StatusCodes.UNPROCESSABLE_ENTITY,
            "NoSuchBucketError",
            "S"
          );
        }

        if (error instanceof NoSuchKey) {
          throw new APIError(
            "Request object not found. There is no such key!",
            StatusCodes.NOT_FOUND,
            "NoSuchKey",
            "E"
          );
        }
      }
      throw new APIError(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.name
      );
    } else {
      throw error;
    }
  }
}
const cloudStorage = new AWS_S3();

export { cloudStorage };

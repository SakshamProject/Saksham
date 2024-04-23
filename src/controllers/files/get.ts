import { Request, Response } from "express";
import {
    GetObjectCommand,
    GetObjectCommandInput,
    ListObjectsV2Command,
    ListObjectsV2CommandInput
} from "@aws-sdk/client-s3";
import config from "../../../config.js";
import s3Client from "../../services/s3/s3.js";
import log from "../../services/logger/logger.js";
import {fileSchema} from "../../types/users/usersSchema.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import defaults from "../../defaults.js";

async function getFiles(request: Request, response: Response) {
    try {
        const params: ListObjectsV2CommandInput = {
            Bucket: config.s3.bucket_name
        }
        const listObjectsV2Command = new ListObjectsV2Command(params);

        const data = await s3Client.send(listObjectsV2Command);
        log("info", "[getFiles]: data: \n %o", data);
        response.json(data);
    }
    catch (error) {

    }
}

function addToCurrentTimeISO(seconds: number) {
    const currentTime = new Date();
    const addToCurrentTime = new Date(currentTime.getTime() + (seconds * 1000));

    return addToCurrentTime.toISOString();
}

async function getFileURL(request: Request, response: Response) {
    try {
        const { key } = fileSchema.parse(request.query);
        const params: GetObjectCommandInput = {
            Bucket: config.s3.bucket_name,
            Key: key
        }
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command,  {
            expiresIn: defaults.s3.expiresIn
        });
        log("info", "[getFileURL]: url: \n %o", url);
        response.json( {
            key,
            url,
            // validUpto: addToCurrentTimeISO(defaults.s3.expiresIn)
            expiresInSeconds: defaults.s3.expiresIn
        });
    }
    catch (error) {

    }
}

export { getFiles, getFileURL };
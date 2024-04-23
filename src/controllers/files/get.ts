import { Request, Response } from "express";
import {de_ListObjectsV2Command} from "@aws-sdk/client-s3/dist-types/protocols/Aws_restXml.js";
import {ListObjectsV2Command, ListObjectsV2CommandInput} from "@aws-sdk/client-s3";
import config from "../../../config.js";
import s3Client from "../../services/s3/s3.js";
import log from "../../services/logger/logger.js";
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

export default getFiles;
import {S3Client, PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3";
import config from "../../../config.js";
import path from "path";
import log from "../logger/logger.js";

const s3Client = new S3Client({
        credentials: {
            accessKeyId: config.s3.access_key,
            secretAccessKey: config.s3.secret_key,
        },
        region: config.s3.default_region
    }
);

function generateKey(personId: string, file: Express.Multer.File): string {
    const key = path.join(personId, `${personId}-${file.fieldname}${path.extname(file.originalname)}`);
    log("info", "[generateKey]: key: \n %s", key);
    return key;
}

async function saveFileBufferToS3(personId: string, file: Express.Multer.File) {
    try {
        const params: PutObjectCommandInput = {
            Bucket: config.s3.bucket_name,
            Key: generateKey(personId, file),
            Body: file.buffer
        }
        log("info", "[saveFileBufferToS3: params: \n %o", params);
        const putObjectCommand = new PutObjectCommand(params);
        const data = await s3Client.send(putObjectCommand);
        log("info", "[saveFileBufferToS3]: data: \n %o", data);
        return data;
    }
    catch (error) {
    }
}

async function saveFileBufferstoS3() {

}

export { saveFileBufferstoS3, saveFileBufferToS3, generateKey}
export default s3Client;
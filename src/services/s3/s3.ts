import {PutObjectCommand, PutObjectCommandInput, S3Client} from "@aws-sdk/client-s3";
import config from "../../../config.js";
import path from "path";
import log from "../logger/logger.js";
import {PutObjectCommandOutput} from "@aws-sdk/client-s3/dist-types/commands/index.js";

const s3Client = new S3Client({
        credentials: {
            accessKeyId: config.s3.access_key,
            secretAccessKey: config.s3.secret_key,
        },
        region: config.s3.default_region,
    }
);

function generateKey(personId: string, file: Express.Multer.File): string {
    const key = path.join(personId, `${personId}-${file.fieldname}${path.extname(file.originalname)}`);
    log("info", "[generateKey]: key: \n %s", key);
    return key;
}

async function saveFileBufferToS3(personId: string, file: Express.Multer.File) {
    try {
        const key = generateKey(personId, file);
        const params: PutObjectCommandInput = {
            Bucket: config.s3.bucket_name,
            Key: key,
            Body: file.buffer
        }
        log("info", "[saveFileBufferToS3: params: \n %o", params);
        const putObjectCommand = new PutObjectCommand(params);
        const output = await s3Client.send(putObjectCommand);
        log("info", "[saveFileBufferToS3]: output: \n %o", output);
        return {key, output: output};
    } catch (error) {
    }
}

async function saveFileBufferstoS3(personId: string, files: { [fieldname: string]: Express.Multer.File[] }) {
    try {
        log("info", "[saveFileBufferstoS3]: files \n %o", files);
        const data: Map<string, { key: string, output: PutObjectCommandOutput }> = new Map();
        for (const file in files) {
            const fieldName = files[file][0].fieldname;
            const output = await saveFileBufferToS3(personId, files[file][0]);
            if (output) {
                data.set(fieldName, output);
            }
            log("info", "[saveFileBufferstoS3]: data: \n %o", data);
        }
        return data;
    } catch (error) {

    }
}

export {saveFileBufferstoS3, saveFileBufferToS3, generateKey}
export default s3Client;
import {
    DeleteObjectCommand,
    DeleteObjectCommandInput,
    GetObjectCommand,
    GetObjectCommandInput,
    ListObjectsV2Command,
    ListObjectsV2CommandInput,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    S3Client
} from "@aws-sdk/client-s3";
import config from "../../../config.js";
import path from "path";
import log from "../logger/logger.js";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import defaults from "../../defaults.js";

type S3Result = { fieldName: string, key: string, output: PutObjectCommandOutput }
const s3Client = new S3Client({
        credentials: {
            accessKeyId: config.s3.access_key,
            secretAccessKey: config.s3.secret_key,
        },
        region: config.s3.default_region,
    }
);

// Check if a file already exists with an identical name sans extension
async function fileExists(personId: string, file: Express.Multer.File) {
    try {
        log("info", "[fileExists]: Checking if file exists...");
        const fileNameWithoutExtension = generateKeyWithoutExtension(personId, file);
        const params: ListObjectsV2CommandInput = {
            Bucket: config.s3.bucket_name,
            Prefix: fileNameWithoutExtension,
            MaxKeys: 1
        }

        const listObjectsV2Command = new ListObjectsV2Command(params);

        const response = await s3Client.send(listObjectsV2Command);
        log("info", "[fileExists]: Response Contents: %o", response.Contents?.[0]);

        if (response.Contents && response.Contents.length > 0) {
            return response.Contents[0].Key
        }
    } catch (error) {

    }
}

async function generateFileURLResponseFromKey(key: string) {
    try {
        const params: GetObjectCommandInput = {
            Bucket: config.s3.bucket_name,
            Key: key
        }
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: defaults.s3.expiresIn
        });
        log("info", "[generateFileURL]: url: \n %o", url);
        return ({
            key,
            url,
            validUpto: addToCurrentTimeISO(defaults.s3.expiresIn),
            expiresInSeconds: defaults.s3.expiresIn
        });

    } catch (error) {

    }
}


function addToCurrentTimeISO(seconds: number) {
    const currentTime = new Date();
    const addToCurrentTime = new Date(currentTime.getTime() + (seconds * 1000));

    return addToCurrentTime.toISOString();
}

async function generateFileURLsResponseFromResult(s3Result: S3Result[]) {
    try {
        const files: {}[] = []
        for (const index in s3Result) {
            const field = s3Result[index].fieldName
            files.push({
                [field]: await generateFileURLResponseFromKey(s3Result[index].key)
            })
        }
        return files
    } catch (error) {

    }

}

async function generateFileURLResponseFromResult(s3Result: S3Result) {
    try {
        const field = s3Result.fieldName
        return (
            {
                [field]: await generateFileURLResponseFromKey(s3Result.key)
            }
        )
    } catch (error) {

    }
}

function generateKeyWithoutExtension(personId: string, file: Express.Multer.File): string {
    const key = path.join(personId, `${personId}-${file.fieldname}`);
    log("info", "[generateKeyWithoutExtension]: key: \n %s", key);
    return key;
}

function generateKey(personId: string, file: Express.Multer.File): string {
    const key = path.join(personId, `${personId}-${file.fieldname}${path.extname(file.originalname)}`);
    log("info", "[generateKey]: key: \n %s", key);
    return key;
}

async function deleteFile(key: string) {
    try {
        const params: DeleteObjectCommandInput = {
            Bucket: config.s3.bucket_name,
            Key: key
        }

        const deleteObjectCommand = new DeleteObjectCommand(params);

        const response = await s3Client.send(deleteObjectCommand);

        return response;
    } catch (error) {

    }
}

async function saveFileBufferToS3(personId: string, file: Express.Multer.File): Promise<S3Result | undefined> {
    try {

        const oldFile = await fileExists(personId, file);
        if (oldFile) {
            // delete it
            log("info", "[saveFileBufferToS3]: File already exists. Deleting it.");
            log("info", "[saveFileBufferToS3]: oldFile: %s", oldFile);

            const s3Result = await deleteFile(oldFile);
            log("info", "[saveFileBufferToS3]: File Deleted. %o", s3Result);
        }

        const key = generateKey(personId, file);
        const params: PutObjectCommandInput = {
            Bucket: config.s3.bucket_name,
            Key: key,
            Body: file.buffer
        }

        log("info", "[saveFileBufferToS3: params: \n %o", params);
        const putObjectCommand = new PutObjectCommand(params);

        const output = await s3Client.send(putObjectCommand);
        log("info", "[saveFileBufferToS3]: File has been saved to S3. \n output: \n %o", output);

        return {fieldName: file.fieldname, key, output: output};

    } catch (error) {

    }
}

async function saveFileBufferstoS3(personId: string, files: { [fieldname: string]: Express.Multer.File[] }) {
    try {
        log("info", "[saveFileBufferstoS3]: files \n %o", files);
        const data: S3Result[] = [];
        for (const file in files) {
            const output = await saveFileBufferToS3(personId, files[file][0]);
            if (output) {
                data.push(output);
            }
            log("info", "[saveFileBufferstoS3]: data: \n %o", data);
        }
        return data;
    } catch (error) {

    }
}

export {
    saveFileBufferstoS3,
    saveFileBufferToS3,
    generateKey,
    generateFileURLResponseFromKey,
    generateFileURLResponseFromResult,
    generateFileURLsResponseFromResult
}
export default s3Client;
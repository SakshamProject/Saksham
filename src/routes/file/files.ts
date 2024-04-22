import express, {response} from "express";
import {S3Client, ListObjectsV2Command, ListObjectsV2CommandInput} from "@aws-sdk/client-s3";
import config from "../../../config.js";

const fileRouter = express.Router();

// This route is for testing only! It will soon be deleted!
fileRouter.get('/', async (req, res) => {
    try {
        const s3Client = new S3Client([{
                credentials: {
                    accessKeyId: config.s3.access_key,
                    secretAccessKey: config.s3.secret_key,
                },
                region: "ap-south-1"
            }]
        );
        const params: ListObjectsV2CommandInput = {
            Bucket: config.s3.bucket_name,
        };
        const data = await s3Client.send(new ListObjectsV2Command(params));
        if (data.Contents) {
            data.Contents.forEach((item) => {
                console.log(`Key: ${item.Key} - Size: ${item.Size}`);
            });
        } else {
            console.log("No objects found in the bucket.");
        }
        response.json(data);
    } catch (e) {
        console.log(e);
    }


});

fileRouter.get('/:id', () => {});

export default fileRouter;
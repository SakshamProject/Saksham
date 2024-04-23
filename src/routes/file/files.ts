import express, {response} from "express";
import {S3Client, ListObjectsV2Command, ListObjectsV2CommandInput} from "@aws-sdk/client-s3";
import config from "../../../config.js";

const fileRouter = express.Router();

fileRouter.get('/:id', () => {});

export default fileRouter;
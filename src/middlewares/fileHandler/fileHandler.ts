import multer from "multer";
import path from "path";
import config from "../../../config.js";
import { Request } from "express";
import {mkdirSync} from "node:fs";

function generateDestination (request: Request, file: Express.Multer.File, callback: Function) {

    const userId = request.user.id || "1f0caad2-a86d-481a-a100-716fe1d255b3";
    const userUploadsDir = path.join(config.__dirname, 'uploads', userId);
    mkdirSync(userUploadsDir, { recursive: true });
    callback(null, userUploadsDir);
}

function generateFileName (request: Request, file: Express.Multer.File, callback: Function) {
    callback(null, `${request.user.id}-${file.fieldname}${path.extname(file.originalname)}`);
}

const multerOptions: multer.DiskStorageOptions = {
    destination: generateDestination,
    filename: generateFileName
}

const storage = multer.diskStorage(multerOptions);

// const fileHandler = multer({ storage: storage });
const fileHandler = multer({storage: storage});
export default fileHandler;
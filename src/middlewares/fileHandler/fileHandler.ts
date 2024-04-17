import multer from "multer";
import path from "path";
import config from "../../../config.js";
import { Request } from "express";
import fs from "fs";
import log from "../../services/logger/logger.js";
import defaults from "../../defaults.js";
import APIError from "../../services/errors/APIError.js";
import {StatusCodes} from "http-status-codes";

function generateDiskStorageDestination (request: Request, file: Express.Multer.File, callback: Function) {

    const userId = request.user.id;
    const userUploadsDir = path.join(config.__dirname, 'uploads', userId);
    fs.mkdirSync(userUploadsDir, { recursive: true });
    callback(null, userUploadsDir);
}

function generateDiskStorageFileName (request: Request, file: Express.Multer.File, callback: Function) {
    callback(null, `${request.user.id}-${file.fieldname}${path.extname(file.originalname)}`);
}

const multerOptions: multer.DiskStorageOptions = {
    destination: generateDiskStorageDestination,
    filename: generateDiskStorageFileName
}

function generateDestination(userOrDivyangId: string ): string {
    const userUploadsDir = path.join(config.__dirname, 'uploads', userOrDivyangId);
    log("info", "[fileHandler]: userUploadsDir: %s", userUploadsDir);
    fs.mkdirSync(userUploadsDir, {recursive: true});
    return userUploadsDir;
}

function generateFileName(userOrDivyangId: string, file: Express.Multer.File): string {
        const fileName = `${userOrDivyangId}-${file.fieldname}${path.extname(file.originalname)}`;
        log("info", "[fileHandler]: fileName: \n %s", fileName);
        return fileName;
}

function writeFile(path: fs.PathOrFileDescriptor, file: Express.Multer.File) {
    try {
        fs.writeFile(path, file.buffer, (error) => {
            if (error) {
                log("error", "[fileHandler]: Error saving file: \n %o", error);
                console.error('Failed to save file:', error);
                return;
            }
            log("info", "[fileHandler]: Saved file: \n %o", file);
        })
    }
    catch (error) {
        log("error", "[fileHandler/writeFile]: Error saving file: \n %o", file);
    }
}

function saveFiles(userOrDivyangId: string, files: { [fieldname: string]: Express.Multer.File[] }) {
    try {
        const userDirPath = generateDestination(userOrDivyangId);
        for (let file in files) {
            const fileName = generateFileName(userOrDivyangId, files[file][0]);
            const filePath = path.join(userDirPath, fileName);
            writeFile(filePath, files[file][0]);
        }
    } catch (error) {
        if (error instanceof Error) {
            log("error", "[fileHandler]: Error saving file: \n %o", error);
        }
    }
}

function saveFile(userOrDivyangId: string, file: Express.Multer.File) {
    try {
        const userDirPath = generateDestination(userOrDivyangId);

        const fileName = generateFileName(userOrDivyangId, file);
        const filePath = path.join(userDirPath, fileName);
        writeFile(filePath, file);

    } catch (error) {
        if (error instanceof Error) {
            log("error", "[fileHandler/saveFile]: Error saving file: \n %o", error);
        }
    }
}

const diskStorage = multer.diskStorage(multerOptions);

const bufferStorage = multer.memoryStorage();

const fileFilter = (request: Request, file: Express.Multer.File , callback: Function) => {
    if (file.mimetype.startsWith('image/')) {
        callback(null, true);  // Accept image
    } else {
        callback(new APIError("Only image file types are allowed!"), StatusCodes.BAD_REQUEST, "WrongFileTypeError", "I");  // Reject file
    }
};

const fileHandler = multer({
    storage: bufferStorage,
    limits: {
        fileSize: defaults.MAX_FILE_SIZE
    },
    fileFilter: fileFilter
});

export {saveFiles, saveFile}
export default fileHandler;
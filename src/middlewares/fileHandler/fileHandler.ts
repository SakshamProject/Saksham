import multer from "multer";
import path from "path";
import config from "../../../config.js";

function generateDestination (request: Request, file: Express.Multer.File, callback: Function) {
    const userId = request.body.userId;
    const userUploadsDir = path.join(config.__dirname, 'uploads', userId);
    callback(null, userUploadsDir);
}

function generateFileName (request: Request, file: Express.Multer.File, callback: Function) {
    callback(null, `${request.user.userId}-${file.fieldname}.${path.extname(file.originalname)}`);
}

const multerOptions: multer.DiskStorageOptions = {
    destination: generateDestination, // Specify the dynamic destination directory
    filename: generateFileName
}

const storage = multer.diskStorage(multerOptions);

const fileHandler = multer({ storage: storage });

export default fileHandler;
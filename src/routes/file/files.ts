import express, {Request, Response} from "express";
import {getFiles, getFileURL} from "../../controllers/files/get.js";

const fileRouter = express.Router();

fileRouter.get('/', getFileURL);

// Dev Only
// fileRouter.get("/list", getFiles);

export default fileRouter;
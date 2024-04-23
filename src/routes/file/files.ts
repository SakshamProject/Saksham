import express from "express";
import getFiles from "../../controllers/files/get.js";

const fileRouter = express.Router();

fileRouter.get('/:key', () => {});

// Dev Only
fileRouter.get("/", getFiles);

export default fileRouter;
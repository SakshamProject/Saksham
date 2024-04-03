import express, {Request, Response, Router} from "express";
import { pingDB } from "../services/database/database.js";
import serviceMasterRouter from "./serviceMaster/serviceMaster.js";
import APIError from "../services/errors/APIError.js";
import {StatusCodes} from "http-status-codes";
import errorHandler from "../middlewares/errorHandler/errorHandler.js";

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get("/check", async (request: Request, response: Response, next): Promise<void> => {
    try {
        await pingDB();
        response.json({"message": "API is up and running!"});
    }
    catch (error) {
        next(error);
    }
});

apiRouter.use("/services", serviceMasterRouter);

apiRouter.use(errorHandler);

export default apiRouter;
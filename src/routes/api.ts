import express, {Request, Response, Router} from "express";
import { pingDB } from "../services/database/database.js";
import serviceMasterRouter from "./serviceMaster/serviceMaster.js";
import APIError from "../services/errors/APIError.js";
import {StatusCodes} from "http-status-codes";

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get("/check", async (request: Request, response: Response): Promise<void> => {
    try {
        await pingDB();
    }
    catch (error) {
        if (error instanceof APIError) {
            response.json({"message": error.message, "error": error});
        }

        else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message": "Some Error Occurred"})
        }
    }
    response.json({"message": "API is up and running!"});
});

apiRouter.use("/services", serviceMasterRouter);

export default apiRouter;
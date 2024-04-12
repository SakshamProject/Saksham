import express, { Request, Response, Router } from "express";
import { pingDB } from "../services/database/database.js";
import typeMasterRouter from "./typeMaster/typeMaster.js";
import errorHandler from "../middlewares/errorHandler/errorHandler.js";
import userRouter from "./users/user.js";
import serviceMasterRouter from "./serviceMaster/serviceMaster.js";
import {StatusCodes} from "http-status-codes";
const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get("/check", async (request: Request, response: Response, next): Promise<void> => {
    try {
        await pingDB();
        response.status(StatusCodes.OK).json({"message": "API is up and running!"});
    }
    catch (error) {
        next(error);
    }
});

apiRouter.use("/services", serviceMasterRouter);
apiRouter.use("/typemaster", typeMasterRouter);
apiRouter.use("/users", userRouter);
apiRouter.use(errorHandler);

export default apiRouter;
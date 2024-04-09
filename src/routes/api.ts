import express, { Request, Response, Router } from "express";
import { pingDB } from "../services/database/database.js";
import typeMasterRouter from "./typeMaster/typeMaster.js";
import serviceMasterRouter from "./serviceMaster/serviceMaster.js";
import {StatusCodes} from "http-status-codes";
import errorHandler from "../middlewares/errorHandler/errorHandler.js";
import errorHandler from "../middlewares/errorHandler.js";
import sevaKendraRouter from "./sevaKendra/sevaKendra.js";

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
    response.json({ message: "API is up and running!" });
  }
);
apiRouter.use("/sevakendras", sevaKendraRouter);
apiRouter.use("/typemaster", typeMasterRouter);

apiRouter.use(errorHandler);
export default apiRouter;
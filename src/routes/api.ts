import express, { Request, Response, Router } from "express";
import { pingDB } from "../services/database/database.js";
import typeMasterRouter from "./typeMaster/typeMaster.js";
import { divyangDetailsRouter } from "./divyangDetails/divyangDetails.js";
import serviceMasterRouter from "./serviceMaster/serviceMaster.js";
import { StatusCodes } from "http-status-codes";

import sevaKendraRouter from "./sevaKendra/sevaKendra.js";
import errorHandler from "../middlewares/errorHandler/errorHandler.js";
import designationRouter from "./designation/designation.js";

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get(
  "/check",
  async (request: Request, response: Response, next): Promise<void> => {
    try {
      await pingDB();
      response
        .status(StatusCodes.OK)
        .json({ message: "API is up and running!" });
    } catch (error) {
      next(error);
    }
  }
);
apiRouter.use("/divyangdetails", divyangDetailsRouter);
apiRouter.use("/services", serviceMasterRouter);
apiRouter.use("/sevakendras", sevaKendraRouter);
apiRouter.use("/typemaster", typeMasterRouter);
apiRouter.use("/designation", designationRouter);
// apiRouter.get("/designation",(req,res)=>{
//   res.send(`[+]router`)
// })

apiRouter.use(errorHandler);
export default apiRouter;

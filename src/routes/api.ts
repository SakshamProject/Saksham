import express, { Request, Response, Router } from "express";
import { pingDB } from "../services/database/database.js";
import sevaKendraRouter from "./sevaKendra/sevaKendra.js";

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get(
  "/check",
  async (request: Request, response: Response): Promise<void> => {
    try {
      await pingDB();
    } catch (error) {
      response.json({ message: "Database Error", error: error });
    }
    response.json({ message: "API is up and running!" });
  }
);

apiRouter.use("/sevaKendra", sevaKendraRouter);

export default apiRouter;

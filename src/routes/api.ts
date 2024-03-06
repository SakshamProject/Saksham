import express, {Request, Response, Router} from "express";
import { pingDB } from "../services/database/database.js";
import designationRouter from "./designation/designation.js";

const apiRouter = Router();

apiRouter.use(express.json());
console.log("[+]enters apirouter")


apiRouter.get("/check", async (request: Request, response: Response): Promise<void> => {
    console.log("[+]enters apirouter///")

    try {

        await pingDB();
    }
    catch (error) {
        response.json({"message": "Database Error", "error": error});
    }
    response.json({"message": "API is up and running!"});
});

console.log("[+]enters apirouter")

apiRouter.use("/designation",designationRouter)



export default apiRouter;
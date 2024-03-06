import express, {Request, Response, Router} from "express";
import { pingDB } from "../services/database/database.js";
import userRouter from "./users/users.js";

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get("/check", async (request: Request, response: Response): Promise<void> => {
    try {
        await pingDB();
    }
    catch (error) {
        response.json({"message": "Database Error", "error": error});
    }
    response.json({"message": "API is up and running!"});
});
apiRouter.use("/user", userRouter);
export default apiRouter;
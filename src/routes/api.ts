import express, {Request, Response, Router} from "express";

const apiRouter = Router();

apiRouter.use(express.json());

apiRouter.get("/check", (request: Request, response: Response): void => {
    response.json({"message": "API is up and running!"});
});

export default apiRouter;
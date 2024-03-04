
import { Router, Response, Request } from "express";
import { postService } from "../../controllers/serviceMaster/serviceMaster.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);

export default serviceMasterRouter;
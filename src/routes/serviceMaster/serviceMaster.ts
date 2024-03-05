
import { Router, Response, Request } from "express";
import {getService, postService} from "../../controllers/serviceMaster/serviceMaster.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);
serviceMasterRouter.get("/", getService);

export default serviceMasterRouter;
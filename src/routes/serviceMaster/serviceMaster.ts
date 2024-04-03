
import {Router, Response, Request, NextFunction} from "express";
import { getServiceByID, getServices } from "../../controllers/serviceMaster/getService.js";
import {deleteService} from "../../controllers/serviceMaster/deleteService.js";
import {postService} from "../../controllers/serviceMaster/postService.js";
import {putService} from "../../controllers/serviceMaster/putService.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);
serviceMasterRouter.get("/", getServices);
serviceMasterRouter.put("/:serviceID",  putService);
serviceMasterRouter.get("/:serviceID", getServiceByID);
serviceMasterRouter.delete("/:serviceID",  deleteService)

export default serviceMasterRouter;
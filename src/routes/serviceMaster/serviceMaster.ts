
import {Router, Response, Request, NextFunction} from "express";
import { deleteServiceById, getServiceByID, getServices, postService, putService} from "../../controllers/serviceMaster/serviceMaster.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);
serviceMasterRouter.get("/", getServices);
serviceMasterRouter.put("/:serviceID",  putService);
serviceMasterRouter.get("/:serviceID", getServiceByID);

serviceMasterRouter.delete("/:serviceID",  deleteServiceById)

export default serviceMasterRouter;
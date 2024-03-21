
import {Router, Response, Request, NextFunction} from "express";
import { deleteServiceById, getServiceByID, getServices, postService, putService} from "../../controllers/serviceMaster/serviceMaster.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);
serviceMasterRouter.get("/", getServices);
serviceMasterRouter.put("/:serviceID", (request: Request, response: Response, next: NextFunction) => {
    request.serviceID = request.params.serviceID;
    next();
}, putService);
serviceMasterRouter.get("/:serviceID", (request: Request, response: Response, next: NextFunction) => {
    request.serviceID = request.params.serviceID;
    next();
}, getServiceByID);

serviceMasterRouter.delete("/:serviceID", (request: Request, response: Response, next: NextFunction) => {
    request.serviceID = request.params.serviceID;
    next();
}, deleteServiceById)

export default serviceMasterRouter;
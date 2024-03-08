
import {Router, Response, Request, NextFunction} from "express";
import {getServiceByID, getServices, postService} from "../../controllers/serviceMaster/serviceMaster.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);
serviceMasterRouter.get("/", getServices);
serviceMasterRouter.get("/:serviceID", (request: Request, response: Response, next: NextFunction) => {
    request.serviceID = request.params.serviceID;
    next();
}, getServiceByID);

export default serviceMasterRouter;
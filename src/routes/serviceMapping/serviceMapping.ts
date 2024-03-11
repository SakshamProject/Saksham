import {Router, Response, Request, NextFunction} from "express";
import {getServiceMapping, postServiceMapping} from "../../controllers/serviceMapping/serviceMapping.js";

const serviceMappingRouter: Router = Router();

serviceMappingRouter.post("/", postServiceMapping);
serviceMappingRouter.get("/", getServiceMapping);

export default serviceMappingRouter;
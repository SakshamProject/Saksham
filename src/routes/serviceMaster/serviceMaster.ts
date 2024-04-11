import { Router, Response, Request, NextFunction } from "express";
import {
  getServiceByID,
  getServices,
} from "../../controllers/serviceMaster/get.js";
import { deleteService } from "../../controllers/serviceMaster/delete.js";
import {
  postService,
  filterService,
} from "../../controllers/serviceMaster/post.js";
import { putService } from "../../controllers/serviceMaster/put.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post("/", postService);
serviceMasterRouter.get("/", getServices);
serviceMasterRouter.put("/:serviceID", putService);
serviceMasterRouter.get("/:serviceID", getServiceByID);
serviceMasterRouter.delete("/:serviceID", deleteService);
serviceMasterRouter.post("/filter", filterService);

export default serviceMasterRouter;

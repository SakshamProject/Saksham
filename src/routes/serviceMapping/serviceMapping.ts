import { Router } from "express";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import { postServiceMapping } from "../../controllers/serviceMapping/post.js";
import {
    getServiceMapping,
    getServiceMappingById,
  } from "../../controllers/serviceMapping/get.js";
  

const serviceMappingRouter = Router();

serviceMappingRouter.use(authenticate);
serviceMappingRouter.post("/", postServiceMapping);
serviceMappingRouter.get("/:id", getServiceMappingById);
serviceMappingRouter.post("/list", getServiceMapping);

export default serviceMappingRouter;

import { Router } from "express";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import { postServiceMapping } from "../../controllers/serviceMapping/post.js";
import {
    getServiceMapping,
    getServiceMappingById,
  } from "../../controllers/serviceMapping/get.js";
  import { putServiceMapping } from "../../controllers/serviceMapping/put.js";


const serviceMappingRouter = Router();

serviceMappingRouter.post("/", postServiceMapping);
serviceMappingRouter.put("/:id", putServiceMapping);
serviceMappingRouter.get("/:id", getServiceMappingById);
serviceMappingRouter.post("/list", getServiceMapping);

export default serviceMappingRouter;

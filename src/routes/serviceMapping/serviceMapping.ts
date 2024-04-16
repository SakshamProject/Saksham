import express from "express";
import {
  getServiceMapping,
  getServiceMappingById,
} from "../../controllers/serviceMapping/get.js";

const serviceMappingRouter = express.Router();

serviceMappingRouter.get("/:id", getServiceMappingById);
serviceMappingRouter.post("/list", getServiceMapping);

export default serviceMappingRouter;

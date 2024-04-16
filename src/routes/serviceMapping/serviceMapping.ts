import express from "express";
import { getServiceMappingById } from "../../controllers/serviceMapping/get.js";

const serviceMappingRouter = express.Router();

serviceMappingRouter.get("/:id", getServiceMappingById);

export default serviceMappingRouter;

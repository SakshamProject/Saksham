import express from "express";
import {
  getDisabilitySubTypeByDisabilityTypeId,
  getDisabilityType,
  getDisabilityTypeById,
} from "../../../controllers/typeMaster/generalMaster/disabilityType/get.js";
import { postDisabilityType } from "../../../controllers/typeMaster/generalMaster/disabilityType/post.js";
import { deleteDisabilityType } from "../../../controllers/typeMaster/generalMaster/disabilityType/delete.js";
import { putDisabilityType } from "../../../controllers/typeMaster/generalMaster/disabilityType/put.js";

const disabilityTypeRouter = express.Router();

disabilityTypeRouter.get("/", getDisabilityType);
disabilityTypeRouter.get("/:id", getDisabilityTypeById);
disabilityTypeRouter.post("/", postDisabilityType);
disabilityTypeRouter.put("/:id", putDisabilityType);
disabilityTypeRouter.delete("/:id", deleteDisabilityType);
disabilityTypeRouter.get(
  "/disabilitysubtypes/:disabilityTypeId",
  getDisabilitySubTypeByDisabilityTypeId
);

export default disabilityTypeRouter;

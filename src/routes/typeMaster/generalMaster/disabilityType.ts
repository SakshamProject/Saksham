import express from "express";
import { getDisabilitySubTypeByDisabilityTypeId, getDisabilityType, getDisabilityTypeById } from "../../../controllers/typeMaster/generalMaster/disabilityType/get.js";

const disabilityTypeRouter = express.Router();

disabilityTypeRouter.get("/",getDisabilityType);
disabilityTypeRouter.get("/:id",getDisabilityTypeById);
// disabilityTypeRouter.post("/",postServiceType);
// disabilityTypeRouter.put("/:id",putServiceType);
disabilityTypeRouter.delete("/:id",deleteDisabilityType);
disabilityTypeRouter.get("/disabilitysubtypes/:disabilityTypeId",getDisabilitySubTypeByDisabilityTypeId);



export default disabilityTypeRouter;
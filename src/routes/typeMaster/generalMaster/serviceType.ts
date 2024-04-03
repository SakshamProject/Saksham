import express from "express";
import { getServiceByServiceTypeId, getServiceType, getServiceTypeById } from "../../../controllers/typeMaster/generalMaster/serviceType/get.js";
import { postServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/post.js";
import { deleteServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/delete.js";
import { putServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/put.js";

const serviceTypeRouter = express.Router();

serviceTypeRouter.get("/",getServiceType);
serviceTypeRouter.get("/:id",getServiceTypeById);
serviceTypeRouter.post("/",postServiceType);
serviceTypeRouter.put("/:id",putServiceType);
serviceTypeRouter.delete("/:id",deleteServiceType);
serviceTypeRouter.get("/services/:serviceTypeId",getServiceByServiceTypeId);



export default serviceTypeRouter;
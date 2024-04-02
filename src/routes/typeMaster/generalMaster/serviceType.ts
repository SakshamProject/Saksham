import express from "express";
import { getServiceTypeById } from "../../../controllers/typeMaster/generalMaster/serviceType/get.js";
import { postServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/post.js";

const serviceTypeRouter = express.Router();

serviceTypeRouter.get("/",);
serviceTypeRouter.get("/:id",getServiceTypeById);
serviceTypeRouter.post("/",postServiceType);
serviceTypeRouter.put("/:id",);
serviceTypeRouter.delete("/:id",);



export default serviceTypeRouter;
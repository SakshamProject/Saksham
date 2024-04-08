import express from "express";
import { postDistrict } from "../../../controllers/typeMaster/generalMaster/district/post.js";
import {
  getDistrict,
  getDistrictById,
} from "../../../controllers/typeMaster/generalMaster/district/get.js";
import { deleteDistrict } from "../../../controllers/typeMaster/generalMaster/district/delete.js";
import { updateDistrict } from "../../../controllers/typeMaster/generalMaster/district/update.js";

const districtRouter = express.Router();
districtRouter.post("/", postDistrict);
districtRouter.get("/", getDistrict);
districtRouter.get("/:id", getDistrictById);
districtRouter.delete("/:id", deleteDistrict);
districtRouter.put("/:id", updateDistrict);

export default districtRouter;

import express from "express";
import { postDistrict } from "../../../controllers/typeMaster/district/post.js";
import {
  getDistrict,
  getDistrictById,
} from "../../../controllers/typeMaster/district/get.js";
import { deleteDistrict } from "../../../controllers/typeMaster/district/delete.js";
import { updateDistrict } from "../../../controllers/typeMaster/district/update.js";
const districtRouter = express.Router();
districtRouter.post("/", postDistrict);
districtRouter.get("/", getDistrict);
districtRouter.get("/:id", getDistrictById);
districtRouter.delete("/:id", deleteDistrict);
districtRouter.put("/:id", updateDistrict);

export default districtRouter;

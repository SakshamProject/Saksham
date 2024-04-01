import express from "express";
import { postTownPanchayat } from "../../../controllers/typeMaster/stateMaster/townPanchayat/post.js";
import {
  getByIdTownPanchayat,
  getTownPanchayat,
} from "../../../controllers/typeMaster/stateMaster/townPanchayat/get.js";
import { putTownPanchayat } from "../../../controllers/typeMaster/stateMaster/townPanchayat/put.js";
import { deleteTownPanchayat } from "../../../controllers/typeMaster/stateMaster/townPanchayat/delete.js";

const TownPanchayatRouter = express.Router();
TownPanchayatRouter.post("/", postTownPanchayat);
TownPanchayatRouter.get("/", getTownPanchayat);
TownPanchayatRouter.get("/:id", getByIdTownPanchayat);
TownPanchayatRouter.put("/:id", putTownPanchayat);
TownPanchayatRouter.delete("/:id", deleteTownPanchayat);

export default TownPanchayatRouter;

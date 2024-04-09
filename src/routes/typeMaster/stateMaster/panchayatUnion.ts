import express from "express";
import { postPanchayatUnion } from "../../../controllers/typeMaster/stateMaster/panchayatUnion/post.js";
import {
  getPanchayatUnion,
  getPanchayatUnionByDistrictId,
  getPanchayatUnionById,
} from "../../../controllers/typeMaster/stateMaster/panchayatUnion/get.js";
import { putPanchayatUnion } from "../../../controllers/typeMaster/stateMaster/panchayatUnion/put.js";
import { deletePanchayatUnion } from "../../../controllers/typeMaster/stateMaster/panchayatUnion/delete.js";

const PanchayatUnionRouter = express.Router();
PanchayatUnionRouter.post("/", postPanchayatUnion);
PanchayatUnionRouter.get("/", getPanchayatUnion);
PanchayatUnionRouter.get("/:id", getPanchayatUnionById);
PanchayatUnionRouter.put("/:id", putPanchayatUnion);
PanchayatUnionRouter.delete("/:id", deletePanchayatUnion);
PanchayatUnionRouter.get("/districts/:id", getPanchayatUnionByDistrictId);

export default PanchayatUnionRouter;

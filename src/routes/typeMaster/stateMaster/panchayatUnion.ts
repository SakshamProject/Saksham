import express from "express";
import { postPanchayatUnion } from "../../../controllers/typeMaster/stateMaster/panchayatUnion/post.js";
import {
  getByIdPanchayatUnion,
  getPanchayatUnion,
} from "../../../controllers/typeMaster/stateMaster/panchayatUnion/get.js";
import { putPanchayatUnion } from "../../../controllers/typeMaster/stateMaster/panchayatUnion/put.js";
import { deletePanchayatUnion } from "../../../controllers/typeMaster/stateMaster/panchayatUnion/delete.js";

const PanchayatUnionRouter = express.Router();
PanchayatUnionRouter.post("/", postPanchayatUnion);
PanchayatUnionRouter.get("/", getPanchayatUnion);
PanchayatUnionRouter.get("/:id", getByIdPanchayatUnion);
PanchayatUnionRouter.put("/:id", putPanchayatUnion);
PanchayatUnionRouter.delete("/:id", deletePanchayatUnion);

export default PanchayatUnionRouter;

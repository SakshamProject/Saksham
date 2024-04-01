import express from "express";
import { postMPConstituency } from "../../../controllers/typeMaster/stateMaster/MPConstituency/post.js";
import {
  getByIdMPConstituency,
  getMPConstituency,
} from "../../../controllers/typeMaster/stateMaster/MPConstituency/get.js";
import { putMPConstituency } from "../../../controllers/typeMaster/stateMaster/MPConstituency/put.js";
import { deleteMPConstituency } from "../../../controllers/typeMaster/stateMaster/MPConstituency/delete.js";

const MPConstituencyRouter = express.Router();
MPConstituencyRouter.post("/", postMPConstituency);
MPConstituencyRouter.get("/", getMPConstituency);
MPConstituencyRouter.get("/:id", getByIdMPConstituency);
MPConstituencyRouter.put("/:id", putMPConstituency);
MPConstituencyRouter.delete("/:id", deleteMPConstituency);

export default MPConstituencyRouter;

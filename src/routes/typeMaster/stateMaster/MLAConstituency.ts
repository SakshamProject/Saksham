import express from "express";
import { postMLAConstituency } from "../../../controllers/typeMaster/stateMaster/MLAConstituency/post.js";
import {
  getMLAConstituency,
  getMLAConstituencyById,
} from "../../../controllers/typeMaster/stateMaster/MLAConstituency/get.js";
import { putMLAConstituency } from "../../../controllers/typeMaster/stateMaster/MLAConstituency/put.js";
import { deleteMLAConstituency } from "../../../controllers/typeMaster/stateMaster/MLAConstituency/delete.js";

const MLAConstituencyRouter = express.Router();
MLAConstituencyRouter.post("/", postMLAConstituency);
MLAConstituencyRouter.get("/", getMLAConstituency);
MLAConstituencyRouter.get("/:id", getMLAConstituencyById);
MLAConstituencyRouter.put("/:id", putMLAConstituency);
MLAConstituencyRouter.delete("/:id", deleteMLAConstituency);

export default MLAConstituencyRouter;

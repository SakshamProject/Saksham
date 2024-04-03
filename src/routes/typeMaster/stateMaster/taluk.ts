import express from "express";
import { postTaluk } from "../../../controllers/typeMaster/stateMaster/taluk/post.js";
import {
  getTalukById,
  getTaluk,
} from "../../../controllers/typeMaster/stateMaster/taluk/get.js";
import { putTaluk } from "../../../controllers/typeMaster/stateMaster/taluk/put.js";
import { deleteTaluk } from "../../../controllers/typeMaster/stateMaster/taluk/delete.js";

const TalukRouter = express.Router();
TalukRouter.post("/", postTaluk);
TalukRouter.get("/", getTaluk);
TalukRouter.get("/:id", getTalukById);
TalukRouter.put("/:id", putTaluk);
TalukRouter.delete("/:id", deleteTaluk);

export default TalukRouter;

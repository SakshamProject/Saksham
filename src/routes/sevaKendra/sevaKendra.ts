import express from "express";
import postSevaKendra, {
  postSevaKendraFilter,
} from "../../controllers/sevaKendra/post.js";
import {
  getSevaKendra,
  getSevaKendraById,
} from "../../controllers/sevaKendra/get.js";
import putSevaKendra from "../../controllers/sevaKendra/put.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.get("/", getSevaKendra);
sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.put("/:id", putSevaKendra);
sevaKendraRouter.post("/filters", postSevaKendraFilter);
// sevaKendraRouter.delete("/:id", deleteSevaKendra);

export default sevaKendraRouter;

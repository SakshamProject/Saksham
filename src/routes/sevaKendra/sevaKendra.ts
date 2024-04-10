import express from "express";
import postSevaKendra, {
  postSevaKendraFilter,
} from "../../controllers/sevaKendra/post.js";
import {
  getSevaKendra,
  getSevaKendraById,
} from "../../controllers/sevaKendra/get.js";
import putSevaKendra from "../../controllers/sevaKendra/put.js";
import errorHandler from "../../middlewares/errorHandler.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.post("/list/", getSevaKendra);
sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.put("/:id", putSevaKendra);

export default sevaKendraRouter;

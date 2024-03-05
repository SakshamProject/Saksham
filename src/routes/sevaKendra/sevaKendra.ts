import express from "express";
import {
  deleteSevaKendra,
  getSevaKendra,
  patchSevaKendra,
  postSevaKendra,
  putSevaKendra,
} from "../../controllers/sevaKendra/sevaKendra.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.get("/", getSevaKendra);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.patch("/", patchSevaKendra);
sevaKendraRouter.put("/", putSevaKendra);
sevaKendraRouter.delete("/", deleteSevaKendra);

export default sevaKendraRouter;

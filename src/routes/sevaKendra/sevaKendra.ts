import express from "express";
import {
  deleteSevaKendra,
  getSevaKendra,
  getSevaKendraById,
  patchSevaKendra,
  postSevaKendra,
  putSevaKendra,
} from "../../controllers/sevaKendra/sevaKendra.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.get("/", getSevaKendra);
sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.patch("/", patchSevaKendra);
sevaKendraRouter.put("/", putSevaKendra);
sevaKendraRouter.delete("/", deleteSevaKendra);

export default sevaKendraRouter;

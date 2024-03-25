import express from "express";
import {
  deleteSevaKendra,
  getSevaKendra,
  getSevaKendraById,
  postSevaKendra,
  putSevaKendra,
} from "../../controllers/sevaKendra/sevaKendra.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.get("/", getSevaKendra);
sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.put("/", putSevaKendra);
sevaKendraRouter.delete("/:id", deleteSevaKendra);

export default sevaKendraRouter;

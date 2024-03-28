import express from "express";
import {
  getState,
  getStateById,
} from "../../../controllers/typeMaster/state/get.js";
import { postState } from "../../../controllers/typeMaster/state/post.js";
import { deleteState } from "../../../controllers/typeMaster/state/delete.js";
import { updateState } from "../../../controllers/typeMaster/state/update.js";
const stateRouter = express.Router();

stateRouter.get("/", getState);
stateRouter.post("/", postState);
stateRouter.get("/:id", getStateById);
stateRouter.delete("/:id", deleteState);
stateRouter.put("/:id", updateState);

export default stateRouter;

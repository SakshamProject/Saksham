import express from "express";
import {
  getState,
  getStateById,
} from "../../../controllers/typeMaster/stateMaster/state/get.js";
import { postState } from "../../../controllers/typeMaster/stateMaster/state/post.js";
import { deleteState } from "../../../controllers/typeMaster/stateMaster/state/delete.js";
import { updateState } from "../../../controllers/typeMaster/stateMaster/state/put.js";

const stateRouter = express.Router();

stateRouter.get("/", getState);
stateRouter.post("/", postState);
stateRouter.get("/:id", getStateById);
stateRouter.delete("/:id", deleteState);
stateRouter.put("/:id", updateState);

export default stateRouter;

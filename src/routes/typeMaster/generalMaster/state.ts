import express from "express";
import {
  getState,
  getStateById,
} from "../../../controllers/typeMaster/generalMaster/state/get.js";
import { postState } from "../../../controllers/typeMaster/generalMaster/state/post.js";
import { deleteState } from "../../../controllers/typeMaster/generalMaster/state/delete.js";
import { updateState } from "../../../controllers/typeMaster/generalMaster/state/put.js";

const stateRouter = express.Router();

stateRouter.get("/", getState);
stateRouter.post("/", postState);
stateRouter.get("/:id", getStateById);
stateRouter.delete("/:id", deleteState);
stateRouter.put("/:id", updateState);

export default stateRouter;

import { Router } from "express";
import { postDesignation } from "../../controllers/designation/post.js";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import {
  getDesignation,
  getDesignationById,
  getFeatures,
} from "../../controllers/designation/get.js";
import { deleteDesignation } from "../../controllers/designation/delete.js";
import { putDesignation } from "../../controllers/designation/put.js";

const designationRouter = Router();

designationRouter.use(authenticate);
designationRouter.get("/features",getFeatures)
designationRouter.post("/list", getDesignation);
designationRouter.get("/:id", getDesignationById);
designationRouter.post("/", postDesignation);
designationRouter.delete("/:id", deleteDesignation);
designationRouter.put("/:id", putDesignation);




export default designationRouter;

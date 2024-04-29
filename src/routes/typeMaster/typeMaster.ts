import express from "express";
import stateMasterRouter from "./stateMaster/stateMaster.js";
import generalMasterRouter from "./generalMaster/generalMaster.js";
import authorization from "../../middlewares/authentication/authorization.js";
import { AuthorizationEnum } from "../../types/authentication/authorizationEnum.js";

const typeMasterRouter = express.Router();

typeMasterRouter.use(
  "/statemaster",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  stateMasterRouter
);

typeMasterRouter.use("/generalmaster", generalMasterRouter);

export default typeMasterRouter;

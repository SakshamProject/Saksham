import express from "express";

import { communityCategoryRouter } from "./communityCategory.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use("/communitycategory", communityCategoryRouter)

export default generalMasterRouter;

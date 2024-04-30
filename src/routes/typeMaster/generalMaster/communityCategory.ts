import express from "express";
import {
  getCommunityCategory,
  getCommunityCategoryById,
} from "../../../controllers/typeMaster/generalMaster/communityCategory/get.js";
import { postCommunityCategory } from "../../../controllers/typeMaster/generalMaster/communityCategory/post.js";
import { deleteCommunityCategory } from "../../../controllers/typeMaster/generalMaster/communityCategory/delete.js";
import { updateCommunityCategory } from "../../../controllers/typeMaster/generalMaster/communityCategory/put.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../../types/authentication/authorizationEnum.js";
import authorization from "../../../middlewares/authentication/authorization.js";
const communityCategoryRouter = express.Router();
communityCategoryRouter.get(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getCommunityCategory
);
communityCategoryRouter.post(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  postCommunityCategory
);
communityCategoryRouter.get(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  getCommunityCategoryById
);
communityCategoryRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  deleteCommunityCategory
);
communityCategoryRouter.put(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  updateCommunityCategory
);

export { communityCategoryRouter };

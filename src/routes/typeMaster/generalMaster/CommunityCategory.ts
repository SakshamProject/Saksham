import express from 'express';
import { getCommunityCategory, getCommunityCategoryById } from '../../../controllers/typeMaster/generalMaster/communityCategory/get.js'
import { postCommunityCategory } from '../../../controllers/typeMaster/generalMaster/communityCategory/post.js';
import { deleteCommunityCategory } from '../../../controllers/typeMaster/generalMaster/communityCategory/delete.js';
import { updateCommunityCategory } from '../../../controllers/typeMaster/generalMaster/communityCategory/put.js';

const communityCategoryRouter = express.Router()
communityCategoryRouter.get("/", getCommunityCategory)
communityCategoryRouter.post("/", postCommunityCategory)
communityCategoryRouter.get("/:id", getCommunityCategoryById)
communityCategoryRouter.delete("/:id", deleteCommunityCategory)
communityCategoryRouter.put("/:id", updateCommunityCategory)

export { communityCategoryRouter }
import express from 'express';
import { getCommunityCategory, getCommunityCategoryById } from '../../../controllers/typeMaster/generalMaster/communityCategory/get.js'
import { postCommunityCategory } from '../../../controllers/typeMaster/generalMaster/communityCategory/post.js';

const CommunityCategoryRouter = express.Router()
CommunityCategoryRouter.use("/", getCommunityCategory)
CommunityCategoryRouter.use("/", postCommunityCategory)
CommunityCategoryRouter.use("/:id", getCommunityCategoryById)
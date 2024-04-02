import { NextFunction, Response, Request } from "express";
import { CommunityCategory, communityCategorySchema } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import { Prisma } from "@prisma/client";
import { createCommunityCategoryDBObject } from "../../../../dto/typeMaster/generalMaster/communityCategory/post.js";
import { createCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/create.js";

const postCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const communityCategory: CommunityCategory = communityCategorySchema.parse(request.body); //Schema goes into types layer
        const communityCategoryDBObject: Prisma.CommunityCategoryUncheckedCreateInput = createCommunityCategoryDBObject(communityCategory); // DBObject goes into dto
        const result: CommunityCategory | undefined = await createCommunityCategoryDB(communityCategoryDBObject); //DB goes into databse layer
        response.send(result);
    } catch (error) {
        next(error)
    }
}

export { postCommunityCategory }
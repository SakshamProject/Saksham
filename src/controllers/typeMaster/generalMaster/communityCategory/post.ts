import { NextFunction, Response, Request } from "express";
import { CommunityCategory, communityCategorySchema } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import { Prisma } from "@prisma/client";
import { createCommunityCategoryDBObject } from "../../../../dto/typeMaster/generalMaster/communityCategory/post.js";
import { createCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const postCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const communityCategory: CommunityCategory = communityCategorySchema.parse(request.body);
        const communityCategoryDBObject: Prisma.CommunityCategoryUncheckedCreateInput = createCommunityCategoryDBObject(communityCategory);
        const result: CommunityCategory | undefined = await createCommunityCategoryDB(communityCategoryDBObject);
        const responsedata = createResponseOnlyData(result||{})
        response.send(responsedata);
    } catch (error) {
        next(error)
    }
}

export { postCommunityCategory }
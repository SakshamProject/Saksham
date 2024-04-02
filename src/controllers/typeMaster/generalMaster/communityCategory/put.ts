import { NextFunction, Response, Request } from "express";
import { CommunityCategory, communityCategorySchema } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import { updateCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/update.js";

const updateCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id
        const communityCategory: CommunityCategory = communityCategorySchema.parse(request.body)
        const result: CommunityCategory | undefined = await updateCommunityCategoryDB(communityCategory, id)
        response.send(result)
    } catch (error) {
        next(error)
    }
}

export { updateCommunityCategory }
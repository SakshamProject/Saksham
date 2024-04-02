import { NextFunction, Response, Request } from "express";
import { CommunityCategory } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import { deleteCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/delete.js";

const deleteCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        const result: CommunityCategory | undefined = await deleteCommunityCategoryDB(id)
        response.send(result);
    } catch (error) {
        next(error)
    }
}

export { deleteCommunityCategory }
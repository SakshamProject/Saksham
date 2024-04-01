import { NextFunction, Response, Request } from "express";
import { getCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/read.js";

const getCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await getCommunityCategoryDB()
        response.send(result)
    } catch (error) {
        next(error)
    }
}

export { getCommunityCategory }
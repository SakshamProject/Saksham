import { NextFunction, Response, Request } from "express";

const getCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result: getCommunityCategorySchema[] | undefined = await getCommunityCategoryDB()
        response.send(result)
    } catch (error) {
        next(error)
    }
}
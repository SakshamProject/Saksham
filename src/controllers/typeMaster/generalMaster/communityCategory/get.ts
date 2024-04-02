import { NextFunction, Response, Request } from "express";
import { getCommunityCategoryByIdDB, getCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/read.js";
import { getCommunityCategorySchema } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";

const getCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result = await getCommunityCategoryDB()
        response.send(result)
    } catch (error) {
        next(error)
    }
}

const getCommunityCategoryById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id: string = request.params.id;
      const result: getCommunityCategorySchema | undefined =
        await getCommunityCategoryByIdDB(id);
      response.send(result);
    } catch (error) {
      next(error);
    }
  };

export { getCommunityCategory, getCommunityCategoryById }
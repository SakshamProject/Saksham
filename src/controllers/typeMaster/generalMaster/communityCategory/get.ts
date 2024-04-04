import { NextFunction, Response, Request } from "express";
import { getCommunityCategoryByIdDB, getCommunityCategoryDB } from "../../../../services/database/typeMaster/generalMaster/communityCategory/read.js";
import { getCommunityCategorySchema } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const getCommunityCategory = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body = getRequestSchema.parse(request.query);
      console.log("body\n",body);
        const result = await getCommunityCategoryDB(body.searchText,body.sortOrder);
        const responseData= createResponseOnlyData(result||{});
        response.send(responseData);
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
        const responseData = createResponseOnlyData(result||{})
      response.send(responseData);
    } catch (error) {
      next(error);
    }
  };

export { getCommunityCategory, getCommunityCategoryById }
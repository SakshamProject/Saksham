import { NextFunction, Response, Request } from "express";
import {
  getCommunityCategoryByIdDB,
  getCommunityCategoryDB,
} from "../../../../services/database/typeMaster/generalMaster/communityCategory/read.js";
import { getCommunityCategorySchema } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import { getCommunityCategoryDBTransaction } from "../../../../services/database/typeMaster/generalMaster/communityCategory/transaction/read.js";

const getCommunityCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getCommunityCategoryDBTransaction(
      query.start,
      query.rows,
      query.sortOrder,
      query.searchText
    );

    const count: number = result?.communityCategory?.length || 0;
    const total: number = result?.total || 0;
    const resultWithRequest = createResponseWithQuery(
      result?.communityCategory || {},
      query,
      total,
      count
    );

    response.send(resultWithRequest);
  } catch (error) {
    next(error);
  }
};

const getCommunityCategoryById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: getCommunityCategorySchema | undefined =
      await getCommunityCategoryByIdDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getCommunityCategory, getCommunityCategoryById };

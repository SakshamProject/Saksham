import { NextFunction, Response, Request } from 'express';
import { CommunityCategory } from '../../../../types/typeMaster/generalMaster/communityCategorySchema.js';
import { deleteCommunityCategoryDB } from '../../../../services/database/typeMaster/generalMaster/communityCategory/delete.js';
import { createResponseOnlyData } from '../../../../types/createResponseSchema.js';

const deleteCommunityCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result = await deleteCommunityCategoryDB(id);
    const responseResult = createResponseOnlyData(result);
    response.send(responseResult);
  } catch (error) {
    next(error);
  }
};

export { deleteCommunityCategory };

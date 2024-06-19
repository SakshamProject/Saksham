import { NextFunction, Request, Response } from 'express';
import { deleteDisabilityOfDivyangDB } from '../../../services/database/divyangDetails/disabilityOfDivyang/delete.js';
import { createResponseOnlyData } from '../../../types/createResponseSchema.js';

const deleteDisabilityOfDivyang = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangId = request.params.id;
    const result = await deleteDisabilityOfDivyangDB(divyangId);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { deleteDisabilityOfDivyang };

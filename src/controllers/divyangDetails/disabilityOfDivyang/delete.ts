import { NextFunction, Request, Response } from 'express';
import { deleteDisabilityOfDivyangDB } from '../../../services/database/divyangDetails/disabilityOfDivyang/delete.js';
import { createResponseOnlyData } from '../../../types/createResponseSchema.js';
import s3Client from '../../../services/s3/s3.js';
import { deleteDisabilityCardFromCloud } from '../../../services/files/disabilityOfDivyang.js';

const deleteDisabilityOfDivyang = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangId = request.params.id;
    const result = await deleteDisabilityOfDivyangDB(divyangId);
    if (result && result.divyang) {
      await deleteDisabilityCardFromCloud(result.divyang.personId, result.id);
    }
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { deleteDisabilityOfDivyang };

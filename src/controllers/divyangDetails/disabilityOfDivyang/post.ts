import { NextFunction, Request, Response } from 'express';
import {
  DisabilityOfDivyang,
  disabilityOfDivyangSchema,
} from '../../../types/divyangDetails/disabilityDetailsSchema.js';
import { createDisabilityOfDivyangDBObject } from '../../../dto/divyangDetails/disabilityOfDivyang/post.js';
import { createDisabilityOfDivyangTransactionDB } from '../../../services/database/divyangDetails/disabilityOfDivyang/create.js';
import { createResponseOnlyData } from '../../../types/createResponseSchema.js';

const postDisabilityOfDivyang = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const disability: DisabilityOfDivyang = disabilityOfDivyangSchema.parse(
      request.body
    );
    const newDisability = createDisabilityOfDivyangDBObject(disability);
    const result = await createDisabilityOfDivyangTransactionDB(
      request,
      newDisability
    );
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { postDisabilityOfDivyang };

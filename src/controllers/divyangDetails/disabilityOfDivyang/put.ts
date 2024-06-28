import { NextFunction, Request, Response } from 'express';
import {
  DisabilityOfDivyang,
  disabilityOfDivyangSchema,
} from '../../../types/divyangDetails/disabilityDetailsSchema.js';
import { updateDisabilityOfDivyangDBObject } from '../../../dto/divyangDetails/disabilityOfDivyang/put.js';
import { updateDisabilityOfDivyangTrasactionDB } from '../../../services/database/divyangDetails/disabilityOfDivyang/update.js';
import { createResponseOnlyData } from '../../../types/createResponseSchema.js';

const putDisabilityOfDivyang = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const disability: DisabilityOfDivyang = disabilityOfDivyangSchema.parse(
      request.body
    );
    const disabilityDBObject = updateDisabilityOfDivyangDBObject(disability);
    const result = await updateDisabilityOfDivyangTrasactionDB(
      request,
      id,
      disabilityDBObject
    );
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { putDisabilityOfDivyang };

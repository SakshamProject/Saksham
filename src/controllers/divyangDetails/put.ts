import { NextFunction, Request, Response } from 'express';
import {
  updateDivyangDetailsRequest,
  updateDivyangDetailsRequestSchema,
} from '../../types/divyangDetails/divyangDetailsSchema.js';
import updateDivyangDetailsTransactionDB from '../../services/database/divyangDetails/transaction/update.js';
import { handleDivyangDetailsFiles } from '../../services/files/divyangDetails.js';

const putDivyangDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const divyangDetails: updateDivyangDetailsRequest =
      updateDivyangDetailsRequestSchema.parse(request.body);
    const updatedBy = request.token?.personId;
    const updatedResult = await updateDivyangDetailsTransactionDB(
      divyangDetails,
      updatedBy,
      id,
      request
    );
    response.send(updatedResult);
  } catch (error) {
    next(error);
  }
};

export { putDivyangDetails };

import { NextFunction, Request, Response } from 'express';
import { createResponseOnlyData } from '../../types/createResponseSchema.js';
import { DivyangDetails } from '@prisma/client';
import {
  createDivyangDetails,
  postDivyangDetailsRequest,
  postDivyangDetailsRequestSchema,
} from '../../types/divyangDetails/divyangDetailsSchema.js';
import {
  createDivyangDBObject,
  createDivyangDetailsDBObject,
} from '../../dto/divyangDetails/post.js';
import { createDivyangDetailsDB } from '../../services/database/divyangDetails/create.js';
import {
  DivyangSignUp,
  divyangSignUpRequestSchema,
} from '../../types/divyangDetails/divyangSignUpRequestSchema.js';
import { handleProfilePhotoFile } from '../../services/files/profilePhoto.js';
import { createDivyangDetailsTransactionDB } from '../../services/database/divyangDetails/transaction/create.js';

async function postDivyangDetails(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const createdBy = request.token?.personId;
    const divyangDetails: postDivyangDetailsRequest =
      postDivyangDetailsRequestSchema.parse(request.body);
    const divyangDetailsDBObject: createDivyangDetails =
      createDivyangDetailsDBObject(divyangDetails, createdBy);
    const result: DivyangDetails | undefined =
      await createDivyangDetailsTransactionDB(request, divyangDetailsDBObject);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
}

const postDivyang = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangDetails: DivyangSignUp = divyangSignUpRequestSchema.parse(
      request.body
    );
    const divyangDetailsDBObject: createDivyangDetails =
      createDivyangDBObject(divyangDetails);
    const result: DivyangDetails | undefined =
      await createDivyangDetailsTransactionDB(request, divyangDetailsDBObject);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { postDivyangDetails, postDivyang };

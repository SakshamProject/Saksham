import { NextFunction, Response, Request } from 'express'
import { createResponseOnlyData } from '../../types/createResponseSchema.js'
import { DivyangDetails, Prisma } from '@prisma/client'
import { DivyangDetailsRequest, divyangDetailsRequestSchema } from '../../types/divyangDetails/divyangDetailsSchema.js'
import { createDivyangDetailsDBObject } from '../../dto/divyangDetails/post.js';
import { createDivyangDetailsDB } from '../../services/database/divyangDetails/create.js';

async function postDivyangDetails(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const divyangDetails: DivyangDetailsRequest = divyangDetailsRequestSchema.parse(request.body);
    const divyangDetailsDBObject: Prisma.DivyangDetailsUncheckedCreateInput = createDivyangDetailsDBObject(divyangDetails)
    const result: DivyangDetails | undefined = await createDivyangDetailsDB(divyangDetailsDBObject)

    const responseData = createResponseOnlyData(result || {})

    response.send(responseData)
  } catch (error) {
    next(error)
  }
}

export { postDivyangDetails }
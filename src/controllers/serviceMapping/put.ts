import { NextFunction, Request, Response } from 'express';
import {
  putServiceMappingSchema,
  putServiceMappingSchemaType,
} from '../../types/serviceMapping/serviceMappingSchema.js';
import { createResponseOnlyData } from '../../types/createResponseSchema.js';
import { putServiceMappingDBTransaction } from '../../services/database/serviceMapping/transaction/update.js';
import { getServiceMappingByIdDB } from '../../services/database/serviceMapping/read.js';

async function putServiceMapping(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: putServiceMappingSchemaType = putServiceMappingSchema.parse(
      request.body
    );
    const id: string = request.params.id;
    const updatedById = request.token?.personId;
    const result = await putServiceMappingDBTransaction(body, id, updatedById);
    if (result) {
      const responseResult = await getServiceMappingByIdDB(result);
      const responseData = createResponseOnlyData(responseResult);
      response.send(responseData);
    }
  } catch (err) {
    next(err);
  }
}
export { putServiceMapping };

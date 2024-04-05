import { NextFunction, Request, Response } from "express";
import {
  disabilityTypeRequestSchema,
  disabilityTypeRequestSchemaType,
} from "../../../../types/typeMaster/generalMaster/disabilityType.js";
import { postDisabilityTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/disabilityType/transaction/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import { getDisabilityTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/disabilityType/read.js";
import prisma from "../../../../services/database/database.js";

async function postDisabilityType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: disabilityTypeRequestSchemaType =
      disabilityTypeRequestSchema.parse(request.body);

    const result = await postDisabilityTypeDBTransaction(body);

    const responseResult = await getDisabilityTypeByIdDB(prisma, result);
    const responseData = createResponseOnlyData(responseResult || {});

    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

export { postDisabilityType };

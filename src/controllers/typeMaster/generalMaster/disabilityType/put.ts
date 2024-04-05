import { NextFunction, Request, Response } from "express";
import {
  getSelectedDisabilitySubTypeSchema,
  updateDisabilityTypeRequestSchema,
  updateDisabilityTypeRequestSchemaType,
} from "../../../../types/typeMaster/generalMaster/disabilityType.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import { putDisabilityTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/disabilityType/transaction/update.js";
import { getDisabilityTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/disabilityType/read.js";
import prisma from "../../../../services/database/database.js";

async function putDisabilityType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: updateDisabilityTypeRequestSchemaType =
      updateDisabilityTypeRequestSchema.parse(request.body);

    const id :string = request.params.id;

    const result = await putDisabilityTypeDBTransaction(body,id);

    const responseResult = await getDisabilityTypeByIdDB(prisma, result);

    const responseData = createResponseOnlyData(responseResult || {});

    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

export { putDisabilityType };

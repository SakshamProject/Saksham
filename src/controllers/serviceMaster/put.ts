import { NextFunction, Request, Response } from "express";
import { putServiceMasterSchema } from "../../types/schemas/serviceMaster/serviceMasterSchema.js";
import { createServiceDBInputObject } from "../../dto/serviceMaster/post.js";
import {updateServiceDB} from "../../services/database/serviceMaster/update.js";
import {createResponseOnlyData} from "../../types/createResponseSchema.js";

async function putService(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body = putServiceMasterSchema.parse(request.body);
    const serviceUpdate = createServiceDBInputObject(body);
    const service = await updateServiceDB(
      serviceUpdate,
      request.params.serviceID
    );
    const responseData = createResponseOnlyData(service);
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}

export { putService };

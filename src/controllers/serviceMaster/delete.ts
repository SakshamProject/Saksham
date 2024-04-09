import { NextFunction, Request, Response } from "express";

import {deleteServiceByIdDB} from "../../services/database/serviceMaster/delete.js";
import {createResponseOnlyData} from "../../types/createResponseSchema.js";

async function deleteService(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const serviceID = request.params.serviceID;
    const result = await deleteServiceByIdDB(serviceID);
    const responseData = createResponseOnlyData(result);
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}

export { deleteService };

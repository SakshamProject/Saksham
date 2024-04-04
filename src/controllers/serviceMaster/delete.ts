import { NextFunction, Request, Response } from "express";
import { deleteServiceByIdDB } from "../../services/database/serviceMaster/serviceMaster.js";

async function deleteService(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const serviceID = request.params.serviceID;
    const result = await deleteServiceByIdDB(serviceID);
    response.json(result);
  } catch (error) {
    next(error);
  }
}

export { deleteService };

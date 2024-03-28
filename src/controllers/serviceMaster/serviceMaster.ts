import { NextFunction, Request, Response} from "express";
import { ZodError } from "zod";
import { getRequestSchema } from "../../types/zodSchemas.js";
import { postServiceMasterSchema, putServiceMasterSchema } from "../../types/schemas/serviceMaster/serviceMaster.schema.js";
import APIError from "../../services/errors/APIError.js";
import {
  createServiceByIdDB,
  deleteServiceByIdDB,
  getServiceByIdDB,
  getServicesDB,
  updateServiceByIdDB,
} from "../../services/database/serviceMaster/serviceMaster.js";
import generateGetResponse from "../utils/generateGetResponse.js";
import {getTotalRowsDB} from "../../services/database/database.js";

async function postService(request: Request, response: Response, next: NextFunction) {
    try {
        const body = postServiceMasterSchema.parse(request.body);
    const service = await createServiceByIdDB(body.name, body.subTypeId);
    response.json(service);
  } catch (error) {
    next(error)
  }
}

async function getServices(request: Request, response: Response, next: NextFunction) {
  try {
    const query = getRequestSchema.parse(request.query);

        // No need to decrement query (query.start - 1).
        // It is taken care of by getRequestSchema
        const services = await getServicesDB(query.orderBy, query.reverse, query.start, query.rows);
      const total = await getTotalRowsDB("Service");
        response.json(await generateGetResponse(query, services, total));
    }
    catch (error) {
      next(error)
    }
  } 

async function putService(request: Request, response: Response, next: NextFunction) {
  try {
    const body = putServiceMasterSchema.parse(request.body)
    console.log("reached controllers")
    const service = await updateServiceByIdDB(request.params.serviceID,body.subTypeId,body.name);// updateService
    response.json(service);
  } catch (error) {
    next(error)
  }
}
async function getServiceByID(request: Request, response: Response, next: NextFunction) {
  try {
    const serviceId = request.params.serviceID;
    const query = getRequestSchema.parse(request.query);
    const service = await getServiceByIdDB(serviceId);

    response.json(service);
  } catch (error) {
    next(error);
  }
}

async function deleteServiceById(request: Request, response: Response, next: NextFunction) {
  try {
    const serviceID = request.params.serviceID;

    const result = await deleteServiceByIdDB(serviceID);

    response.json(result);
  } catch (error) {
    next(error);
  }
}

export { postService, getServices, getServiceByID, deleteServiceById, putService };
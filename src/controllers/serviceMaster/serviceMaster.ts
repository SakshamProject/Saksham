import { Request, Response } from "express";
import { ZodError } from "zod";
import { getRequestSchema } from "../schemas/zodSchemas.js";
import { postServiceMasterSchema, putServiceMasterSchema } from "./serviceMaster.schema.js";
import APIError from "../../services/errors/APIError.js";
import {
  createServiceByIdDB,
  deleteServiceByIdDB,
  getServiceByIdDB,
  getServicesDB,
  updateServiceByIdDB,
} from "../../services/database/serviceMaster/serviceMaster.js";

import defaults from "../../defaults.js";
import generateResponse from "../utils/generateResponse.js";

async function postService(request: Request, response: Response): Promise<void> {
    try {
        const body = postServiceMasterSchema.parse(request.body);
    const service = await createServiceByIdDB(body.name, body.subTypeId);
    response.json(service);
  } catch (error) {
    if (error instanceof ZodError) {
      response.json(error);
    }
  }
}

async function getServices(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const query = getRequestSchema.parse(request.query);

        // No need to decrement query (query.start - 1).
        // It is taken care of by getRequestSchema
        const services = await getServicesDB(query.orderBy, query.reverse, query.start, query.rows);

        response.json(await generateResponse(query, services));
    }
    catch (error) {
        if (error instanceof ZodError) {
            response.json(error);
        }
    }
  } 

async function putService(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const body = putServiceMasterSchema.parse(request.body)
    console.log("reached controllers")
    const service = await updateServiceByIdDB(request.params.serviceID,body.subTypeId,body.name);// updateService
    response.json(service);
  } catch (error) {
    if (error instanceof ZodError) {
      response.json(error);
    }
    if (error instanceof APIError) {
      response.json(error);
    }
  }
}
async function getServiceByID(request: Request, response: Response) {
  try {
    const serviceId = request.params.serviceID;
    const query = getRequestSchema.parse(request.query);
    const service = await getServiceByIdDB(serviceId, query.start, query.rows);

    response.json(service);
  } catch (error) {
    console.log(error);
  }
}

async function deleteServiceById(request: Request, response: Response) {
  try {
    const serviceID = request.params.serviceID;

    const result = await deleteServiceByIdDB(serviceID);

    response.json(result);
  } catch (error) {
    console.log(error);
  }
}

export { postService, getServices, getServiceByID, deleteServiceById,putService};

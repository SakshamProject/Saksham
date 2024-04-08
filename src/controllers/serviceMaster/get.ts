import { NextFunction, Request, Response } from "express";
import { getTotalRowsWithOrWithoutFilterDB } from "../../services/database/database.js";
import getRequestSchema from "../../types/getRequestSchema.js";
import { createResponseWithQuery } from "../../types/createResponseSchema.js";
import {getServiceByIdDB, getServicesDB} from "../../services/database/serviceMaster/read.js";

async function getServices(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = getRequestSchema.parse(request.query);

    // No need to decrement query (query.start - 1).
    // It is taken care of by getRequestSchema
    const services = await getServicesDB(
      query.orderByColumn,
      query.sortOrder,
      query.start,
      query.rows,
      query.searchText
    );
    const total = await getTotalRowsWithOrWithoutFilterDB(
      "Service",
      query.searchText
    );
    const count = services?.length || 0;
    const responseData = createResponseWithQuery(
      services || {},
      query,
      total,
      count
    );
    response.json();
  } catch (error) {
    next(error);
  }
}

async function getServiceByID(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const serviceId = request.params.serviceID;
    const query = getRequestSchema.parse(request.query);
    const service = await getServiceByIdDB(serviceId);

    response.json(service);
  } catch (error) {
    next(error);
  }
}

export { getServices, getServiceByID };

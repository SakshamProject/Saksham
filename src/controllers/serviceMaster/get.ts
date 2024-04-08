import { NextFunction, Request, Response } from "express";
import { getTotalRowsWithOrWithoutFilterDB } from "../../services/database/database.js";
import getRequestSchema from "../../types/getRequestSchema.js";
import { createResponseWithQuery } from "../../types/createResponseSchema.js";
import {getServiceByIdDB} from "../../services/database/serviceMaster/read.js";
import {getServiceDBTransaction} from "../../services/database/serviceMaster/transactions/read.js";

async function getServices(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = getRequestSchema.parse(request.query);

    // No need to decrement query (query.start - 1).
    // It is taken care of by getRequestSchema
    const result = await getServiceDBTransaction(
        query.start,
        query.rows,
        query.orderBy,
        query.sortOrder,
        query.searchText
    );

    const count = result?.services?.length || 0;
    const total = result?.total || 0;
    const responseWithRequest = createResponseWithQuery(
        result?.services || {},
        query,
        total,
        count
    );

    response.json(responseWithRequest);

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

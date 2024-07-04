import { NextFunction, Request, Response } from 'express';
import getRequestSchema from '../../types/getRequestSchema.js';
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from '../../types/createResponseSchema.js';
import {
  getServiceByIdDB,
  getSevaKendrasByServiceIdDB,
} from '../../services/database/serviceMaster/read.js';
import { getServicesDBTransaction } from '../../services/database/serviceMaster/transactions/read.js';

async function getServices(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = getRequestSchema.parse(request.query);

    // No need to decrement query (query.start - 1).
    // It is taken care of by getRequestSchema
    const result = await getServicesDBTransaction(
      query.start,
      query.rows,
      query.orderByColumn,
      query.sortOrder,
      query.searchText
    );

    const count = result?.services?.length || 0;
    const total = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.services,
      query,
      total,
      count
    );

    response.json(responseData);
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
    const service = await getServiceByIdDB(serviceId);
    const responseData = createResponseOnlyData(service);
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}
const getSevaKendrasByServiceId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const serviceId = request.params.serviceId;
    const sevakendras = await getSevaKendrasByServiceIdDB(serviceId);
    const responseData = createResponseOnlyData(sevakendras);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getServices, getServiceByID, getSevaKendrasByServiceId };

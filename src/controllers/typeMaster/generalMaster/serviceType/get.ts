import { Request, Response, NextFunction } from "express";
import { getServiceTypeWithServiceSchema } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import getRequestSchema, {
  getRequestType,
} from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import {
  getServiceByServiceTypeIdDBTransaction,
  getServiceTypeDBTransaction,
} from "../../../../services/database/typeMaster/generalMaster/serviceType/transaction/read.js";
import prisma from "../../../../services/database/database.js";

async function getServiceTypeById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const serviceType=
      await getServiceTypeByIdDB(prisma, id);
    const result = createResponseOnlyData(serviceType ||{});
    response.send(result);
  } catch (err) {
    next(err);
  }
}

async function getServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = getRequestSchema.parse(request.query);

    const result = await getServiceTypeDBTransaction(
      query.start,
      query.rows,
      query.sortOrder,
      query.searchText
    );

    const count: number = result?.serviceType?.length || 0;
    const total: number = result?.total || 0;
    const resultWithRequest = createResponseWithQuery(
      result?.serviceType || {},
      query,
      total,
      count
    );

    response.send(resultWithRequest);
  } catch (err) {
    next(err);
  }
}

async function getServiceByServiceTypeId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query: getRequestType = getRequestSchema.parse(request.query);
    const id = request.params.serviceTypeId;
    const result = await getServiceByServiceTypeIdDBTransaction(
      id,
      query.sortOrder
    );

    const count: number = result?.serviceType?.length || 0;
    const total: number = result?.total || 0;
    const resultWithRequest = createResponseWithQuery(
      result?.serviceType || {},
      query,
      total,
      count
    );

    response.send(resultWithRequest);
  } catch (err) {
    next(err);
  }
}

export { getServiceTypeById, getServiceType, getServiceByServiceTypeId };

import { NextFunction, Request, Response } from "express";
import {
  filterServiceMasterSchema,
  postServiceMasterSchema,
  postServiceMasterType,
} from "../../types/serviceMaster/serviceMasterSchema.js";
import {
  createServiceDBInputObject,
  createServiceFilterInputObject,
} from "../../dto/serviceMaster/post.js";
import {createServiceDB} from "../../services/database/serviceMaster/create.js";
import {getFilterServicesDBTransaction} from "../../services/database/serviceMaster/transactions/filter.js";
import {createResponseForFilter, createResponseOnlyData} from "../../types/createResponseSchema.js";
import filterRequestSchema from "../../types/filterRequestSchema.js";

async function postService(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: postServiceMasterType = postServiceMasterSchema.parse(request.body);
    const serviceInput = createServiceDBInputObject(body);
    const service = await createServiceDB(serviceInput);
    const responseData = createResponseOnlyData(service);
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}

async function filterService(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    console.log(request);
    const body = filterServiceMasterSchema.parse(request.body);
    const query = filterRequestSchema.parse(request.query);
    const serviceWhereInput = createServiceFilterInputObject(body);
    const results = await getFilterServicesDBTransaction(query.start, query.rows, query.orderBy, query.sortOrder, serviceWhereInput);
    const count = results?.services?.length || 0;
    const responseData = createResponseForFilter(results?.services, query, results?.total, count, body);
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}
export { postService, filterService };
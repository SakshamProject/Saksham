import { NextFunction, Request, Response } from "express";
import {
  filterServiceMasterSchema,
  postServiceMasterSchema,
  postServiceMasterType,
} from "../../types/schemas/serviceMaster/serviceMasterSchema.js";
import {
  createServiceDB,
  filterServiceDB,
} from "../../services/database/serviceMaster/serviceMaster.js";
import {
  createServiceDBInputObject,
  createServiceFilterInputObject,
} from "../../dto/serviceMaster/postService.js";

async function postService(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: postServiceMasterType = postServiceMasterSchema.parse(
      request.body
    );
    const serviceInput = createServiceDBInputObject(body);
    const service = await createServiceDB(serviceInput);
    response.json(service);
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
    const body = filterServiceMasterSchema.parse(request.body);
    const serviceWhereInput = createServiceFilterInputObject(body);
    const results = await filterServiceDB(serviceWhereInput);
    response.json(results);
  } catch (error) {
    next(error);
  }
}
export { postService, filterService };

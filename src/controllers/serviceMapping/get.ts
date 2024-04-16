import { NextFunction, Request, Response } from "express";
import {
  getServiceMappingSchema,
  serviceMappingFilter,
} from "../../types/serviceMapping/serviceMappingScreens.js";
import { getServiceMappingByIdDB } from "../../services/database/serviceMapping/read.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

const getServiceMapping = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const serviceMappingRequest = getServiceMappingSchema.parse(request.body);
  } catch (error) {
    next(error);
  }
};

const getServiceMappingById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const serviceMappingId = request.params.id;
    const result = getServiceMappingByIdDB(serviceMappingId);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getServiceMapping };

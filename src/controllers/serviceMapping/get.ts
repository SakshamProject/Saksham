import { NextFunction, Request, Response } from "express";
import {
  getServiceMappingSchema,
  serviceMappingFilter,
} from "../../types/serviceMapping/serviceMappingScreens.js";

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

export { getServiceMapping };

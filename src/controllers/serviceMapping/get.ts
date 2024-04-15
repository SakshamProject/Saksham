import { NextFunction, Request, Response } from "express";

const getServiceMapping = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
    try {
      const serviceMappingRequest = 

  } catch (error) {
    next(error);
  }
};

export { getServiceMapping };

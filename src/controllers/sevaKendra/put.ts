import { NextFunction, Request, Response } from "express";
import SevaKendraRequestSchema from "../../types/sevaKendra/sevaKendra.js";

const putSevaKendra = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updateRequestSevaKendra = SevaKendraRequestSchema.parse(request.body);
      const id = request.params.id;
      
  } catch (error) {
    next(error);
  }
};

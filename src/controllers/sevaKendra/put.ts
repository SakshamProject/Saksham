import { NextFunction, Request, Response } from "express";
import SevaKendraRequestSchema from "../../types/sevaKendra/sevaKendra.js";
import { getSevaKendraServicesById } from "../../services/database/sevaKendra/read.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

const putSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const updateRequestSevaKendra = SevaKendraRequestSchema.parse(request.body);
    const id = request.params.id;
    const currentServices = await getSevaKendraServicesById(id);
    const result = currentServices;
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export default putSevaKendra;

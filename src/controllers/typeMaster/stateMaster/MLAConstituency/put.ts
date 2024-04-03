import { NextFunction, Request, Response } from "express";
import {
  MLAConstituency,
  MLAConstituencySchema,
} from "../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import { updateMLAConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/update.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const putMLAConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const MLAConstituency = MLAConstituencySchema.parse(request.body);
    const result: MLAConstituency | undefined = await updateMLAConstituencyDB(
      id,
      MLAConstituency
    );

    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { putMLAConstituency };

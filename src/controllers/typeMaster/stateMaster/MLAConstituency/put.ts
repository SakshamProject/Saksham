import { NextFunction, Request, Response } from "express";
import {
  MLAConstituency,
  MLAConstituencySchema,
} from "../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import { updateMLAConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/update.js";

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

    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { putMLAConstituency };

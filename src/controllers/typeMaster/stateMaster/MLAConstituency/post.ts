import { NextFunction, Request, Response } from "express";
import {
  MLAConstituency,
  MLAConstituencySchema,
} from "../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import { createMLAConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MLAConstituency/create.js";

const postMLAConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const MLAConstituency: MLAConstituency = MLAConstituencySchema.parse(request.body);
    const result: MLAConstituency | undefined = await createMLAConstituencyDB(
      MLAConstituency
    );
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { postMLAConstituency };

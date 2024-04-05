import { NextFunction, Request, Response } from "express";
import {
  MPConstituency,
  MPConstituencySchema,
} from "../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import { createMPConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MPConstituency/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const postMPConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const MPConstituency: MPConstituency = MPConstituencySchema.parse(
      request.body
    );
    const result: MPConstituency | undefined = await createMPConstituencyDB(
      MPConstituency
    );
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { postMPConstituency };

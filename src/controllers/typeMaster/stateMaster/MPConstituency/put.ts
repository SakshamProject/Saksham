import { NextFunction, Request, Response } from "express";
import {
  MPConstituency,
  MPConstituencySchema,
} from "../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import { updateMPConstituencyDB } from "../../../../services/database/typeMaster/stateMaster/MPConstituency/update.js";

const putMPConstituency = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const MPConstituency = MPConstituencySchema.parse(request.body);
    const result: MPConstituency | undefined = await updateMPConstituencyDB(
      id,
      MPConstituency
    );

    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { putMPConstituency };

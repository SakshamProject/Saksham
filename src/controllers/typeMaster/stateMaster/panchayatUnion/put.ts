import { NextFunction, Request, Response } from "express";
import {
  PanchayatUnion,
  panchayatUnionSchema,
} from "../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import { updatePanchayatUnionDB } from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/update.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const putPanchayatUnion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const panchayatUnion = panchayatUnionSchema.parse(request.body);
    const result: PanchayatUnion | undefined = await updatePanchayatUnionDB(
      id,
      panchayatUnion
    );

    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { putPanchayatUnion };

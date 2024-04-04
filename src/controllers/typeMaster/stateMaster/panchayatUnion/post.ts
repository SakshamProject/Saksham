import { NextFunction, Request, Response } from "express";
import {
  PanchayatUnion,
  panchayatUnionSchema,
} from "../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import { createPanchayatUnionDB } from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const postPanchayatUnion = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const panchayatUnion: PanchayatUnion = panchayatUnionSchema.parse(request.body);
    const result: PanchayatUnion | undefined = await createPanchayatUnionDB(
      panchayatUnion
    );
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { postPanchayatUnion };

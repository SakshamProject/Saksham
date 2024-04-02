import { NextFunction, Request, Response } from "express";
import {
  PanchayatUnion,
  panchayatUnionSchema,
} from "../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import { createPanchayatUnionDB } from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/create.js";

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
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { postPanchayatUnion };

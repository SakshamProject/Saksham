import { NextFunction, Request, Response } from "express";
import {
  PanchayatUnion,
  panchayatUnionSchema,
} from "../../../../types/typeMaster/stateMaster/panchayatUnionSchema.js";
import { updatePanchayatUnionDB } from "../../../../services/database/typeMaster/stateMaster/panchayatUnion/update.js";

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

    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { putPanchayatUnion };

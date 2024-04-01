import { NextFunction, Request, Response } from "express";
import {
  Corporation,
  corporationSchema,
} from "../../../../types/typeMaster/stateMaster/corporationSchema.js";
import { updateCorporationDB } from "../../../../services/database/typeMaster/stateMaster/corporation/update.js";

const putCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const corporation = corporationSchema.parse(request.body);
    const result: Corporation | undefined = await updateCorporationDB(
      id,
      corporation
    );

    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { putCorporation };

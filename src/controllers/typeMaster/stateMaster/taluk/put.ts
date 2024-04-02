import { NextFunction, Request, Response } from "express";
import {
  Taluk,
  talukSchema,
} from "../../../../types/typeMaster/stateMaster/talukSchema.js";
import { updateTalukDB } from "../../../../services/database/typeMaster/stateMaster/taluk/update.js";

const putTaluk = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const taluk = talukSchema.parse(request.body);
    const result: Taluk | undefined = await updateTalukDB(
      id,
      taluk
    );

    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { putTaluk };

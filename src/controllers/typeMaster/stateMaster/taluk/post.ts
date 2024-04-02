import { NextFunction, Request, Response } from "express";
import {
  Taluk,
  talukSchema,
} from "../../../../types/typeMaster/stateMaster/talukSchema.js";
import { createTalukDB } from "../../../../services/database/typeMaster/stateMaster/taluk/create.js";

const postTaluk = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const taluk: Taluk = talukSchema.parse(request.body);
    const result: Taluk | undefined = await createTalukDB(
      taluk
    );
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { postTaluk };

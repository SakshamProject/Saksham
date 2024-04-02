import { NextFunction, Request, Response } from "express";
import { deleteTalukDB } from "../../../../services/database/typeMaster/stateMaster/taluk/delete.js";
import { Taluk } from "../../../../types/typeMaster/stateMaster/talukSchema.js";

const deleteTaluk = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: Taluk | undefined = await deleteTalukDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteTaluk };

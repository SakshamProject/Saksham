import { NextFunction, Request, Response } from "express";
import { District } from "../../../../types/typeMaster/generalMaster/districtSchema.js";
import { deleteDistrictDB } from "../../../../services/database/typeMaster/generalMaster/district/delete.js";

const deleteDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: District | undefined = await deleteDistrictDB(id);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { deleteDistrict };

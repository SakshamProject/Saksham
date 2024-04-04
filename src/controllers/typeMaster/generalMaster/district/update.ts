import { NextFunction, Request, Response } from "express";
import {
  District,
  districtSchema,
} from "../../../../types/typeMaster/generalMaster/districtSchema.js";
import { State } from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import { updateDistrictDB } from "../../../../services/database/typeMaster/generalMaster/district/update.js";

const updateDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const district: District = districtSchema.parse(request.body);
    const result: State | undefined = await updateDistrictDB(id, district);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { updateDistrict };

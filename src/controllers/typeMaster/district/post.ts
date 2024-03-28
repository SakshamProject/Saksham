import { NextFunction, Request, Response } from "express";
import {
  District,
  districtSchema,
} from "../../../types/typeMaster/stateMaster/districtSchema.js";
import { Prisma } from "@prisma/client";
import { createDistrictDBObject } from "../../../dto/typeMaster/post.js";
import { createDistrictDB } from "../../../services/database/typeMaster/district/create.js";

const postDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const district: District = districtSchema.parse(request.body);
    const districtDBObject: Prisma.DistrictUncheckedCreateInput =
      createDistrictDBObject(district);
    const result: District | undefined = await createDistrictDB(
      districtDBObject
    );
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { postDistrict };

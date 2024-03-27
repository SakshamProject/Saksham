import { NextFunction, Request, Response } from "express";
import {
  district,
  districtSchema,
  state,
  stateSchema,
} from "../../models/typeMaster/zod.js";
import { Prisma } from "@prisma/client";
import {
  createDistrictDBObject,
  createStateDBObject,
} from "../../dto/typeMaster/post.js";
import {
  createDistrictDB,
  createStateDB,
} from "../../services/database/typeMaster/create.js";

const postState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const state: state = stateSchema.parse(request.body);
    const stateDBObject: Prisma.StateUncheckedCreateInput =
      createStateDBObject(state);
    const result: state | undefined = await createStateDB(stateDBObject);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

const postDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const district: district = districtSchema.parse(request.body);
    const districtDBObject: Prisma.DistrictUncheckedCreateInput =
      createDistrictDBObject(district);
    const result: district | undefined = await createDistrictDB(
      districtDBObject
    );
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export { postState, postDistrict };

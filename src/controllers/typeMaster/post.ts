import { NextFunction, Request, Response } from "express";
import {
  State,
  stateSchema,
} from "../../types/typeMaster/stateMaster/stateSchema.js";
import {
  District,
  districtSchema,
} from "../../types/typeMaster/stateMaster/districtSchema.js";

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
    const state: State = stateSchema.parse(request.body);
    const stateDBObject: Prisma.StateUncheckedCreateInput =
      createStateDBObject(state);
    const result: State | undefined = await createStateDB(stateDBObject);
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

export { postState, postDistrict };

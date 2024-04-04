import { NextFunction, Request, Response } from "express";
import {
  State,
  stateSchema,
} from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import { Prisma } from "@prisma/client";
import { createStateDBObject } from "../../../../dto/typeMaster/generalMaster/state/post.js";
import { createStateDB } from "../../../../services/database/typeMaster/generalMaster/state/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

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
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { postState };

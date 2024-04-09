import { NextFunction, Request, Response, response } from "express";
import { getStateSchema } from "../../../../types/typeMaster/generalMaster/stateSchema.js";
import { getStateByIdDB } from "../../../../services/database/typeMaster/generalMaster/state/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { getStateDBTransaction } from "../../../../services/database/typeMaster/generalMaster/state/transaction/read.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";

const getState = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getStateDBTransaction(
      query.sortOrder,
      query.searchText
    );
    const total: number = result?.total || 0;
    const count: number = result?.states?.length || 0;
    const responseData = createResponseWithQuery(
      result?.states,
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
const getStateById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    console.log(id);
    const result: getStateSchema | undefined = await getStateByIdDB(id);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getState, getStateById };

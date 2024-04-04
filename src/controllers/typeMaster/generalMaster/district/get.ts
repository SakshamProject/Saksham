import { NextFunction, Request, Response, response } from "express";
import { getDistrictsWithStateSchema } from "../../../../types/typeMaster/generalMaster/districtSchema.js";
import {
  getDistrictByIdDB,
  getDistrictDB,
} from "../../../../services/database/typeMaster/generalMaster/district/read.js";
import { getDistrictDBTransaction } from "../../../../services/database/typeMaster/generalMaster/district/transaction/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";

const getDistrict = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getDistrictDBTransaction(query.sortOrder);
    const total = result?.total || 0;
    const count = result?.districts?.length || 0;
    const responseData = createResponseWithQuery(
      result || {},
      query,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getDistrictById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: getDistrictsWithStateSchema | undefined =
      await getDistrictByIdDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { getDistrict, getDistrictById };

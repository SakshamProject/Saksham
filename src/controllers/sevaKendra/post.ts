import { NextFunction, Request, Response } from "express";
import SevaKendraRequestSchema, {
  SevaKendra,
  SevaKendraColumnNameSchema,
  SevaKendraRequestSchemaType,
  filterSevaKendraSchema,
} from "../../types/sevaKendra/sevaKendra.js";
import {
  createResponseForFilter,
  createResponseOnlyData,
} from "../../types/createResponseSchema.js";
import {
  createSevaKendraDBObject,
  createSevaKendraFilterInputObject,
} from "../../dto/sevaKendra/create.js";
import { createSevaKendraDB } from "../../services/database/sevaKendra/create.js";
import filterRequestSchema from "../../types/filterRequestSchema.js";
import { filterSevaKendraDBTotal } from "../../services/database/sevaKendra/filter.js";
import filterSevaKendraDBTransaction from "../../services/database/sevaKendra/transaction/filter.js";
import { sevaKendraColumnNameMapper } from "../../services/database/utils/sevaKendra/sevaKendraMapper.js";

const postSevaKendra = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const newSevaKendra: SevaKendraRequestSchemaType =
      SevaKendraRequestSchema.parse(request.body);
    const createdBy = "";
    const sevaKendraDBObject: SevaKendra = createSevaKendraDBObject(
      newSevaKendra,
      createdBy
    );
    const result = await createSevaKendraDB(sevaKendraDBObject);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const postSevaKendraFilter = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const filters = filterSevaKendraSchema.parse(request.body);
    const query = filterRequestSchema.parse(request.query);
    const sevaKendraWhereInput = createSevaKendraFilterInputObject(filters);
    const orderByColumn = SevaKendraColumnNameSchema.parse(query.orderByColumn);
    const orderByColumnAndSortOrder = sevaKendraColumnNameMapper(
      orderByColumn,
      query.sortOrder
    );
    console.log(sevaKendraWhereInput.AND);
    console.log({
      filters,
      query,
      sevaKendraWhereInput,
      orderByColumnAndSortOrder,
    });
    const result = await filterSevaKendraDBTransaction(
      query.start,
      query.rows,
      orderByColumnAndSortOrder,
      sevaKendraWhereInput
    );
    const total: number = result?.total || 0;
    const count: number = result?.filteredSevaKendra.length || 0;
    const responseData = createResponseForFilter(
      result?.filteredSevaKendra,
      query,
      total,
      count,
      filters
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { postSevaKendraFilter };
export default postSevaKendra;

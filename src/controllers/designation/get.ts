import { NextFunction, Request, Response } from "express";
import {
  getDesignationByIDDB,
  getFeaturesDB,
} from "../../services/database/designation/read.js";
import {
  createResponseForFilter,
  createResponseOnlyData,
} from "../../types/createResponseSchema.js";
import { getDesignationDBTransaction } from "../../services/database/designation/transaction/read.js";
import {
  DesignationWhere,
  getDesignationSchema,
} from "../../types/designation/designationSchema.js";
import {
  designationColumnNameMapper,
  designationsearchCondition,
} from "../../services/database/utils/designation/designation.js";
import { createDesignationFilterInputObject } from "../../dto/designation/designation.js";

async function getDesignation(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body = getDesignationSchema.parse(request.body);

    const orderByObject = designationColumnNameMapper(
      body.sorting?.orderByColumn,
      body.sorting?.sortOrder
    );

    const searchCondition: DesignationWhere | null =
      body.searchText === undefined
        ? null
        : designationsearchCondition(body.searchText);

    const designationWhereInput = createDesignationFilterInputObject(
      body.filters,
      searchCondition
    );

    const result = await getDesignationDBTransaction(
      designationWhereInput,
      orderByObject,
      body.pagination?.start,
      body.pagination?.rows
    );
    const count: number = result?.designations?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseForFilter(
      result?.designations || {},
      request.body,
      total,
      count
    );

    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

async function getDesignationById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id: string = request.params.id;
    const result = await getDesignationByIDDB(id);

    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

async function getFeatures(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const features = await getFeaturesDB();
    const responseData = createResponseOnlyData(features);
    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

export { getDesignationById, getDesignation, getFeatures };

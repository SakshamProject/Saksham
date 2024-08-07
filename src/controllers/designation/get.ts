import { NextFunction, Request, Response } from "express";
import {
  getDesignationByIDDB,
  getDesignationsBySevaKendraIdDB,
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
import { getDesignationStatus } from "../../services/database/designation/update.js";
import { AuditLogStatusEnum } from "@prisma/client";
import { auditLogStatusEnumSchema } from "../../types/inputFieldSchema.js";

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

    const currentDate = new Date().toISOString();

    const auditLog = await getDesignationStatus(id, currentDate);

    const responseData = createResponseOnlyData({
      ...result,
      status: auditLog?.status,
      description: auditLog?.description,
      effectiveFromDate: auditLog?.date,
      timestamp: currentDate,
    });
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

const getDesignationsBySevaKendraId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const sevaKendraId = request.params.id;
    const status: AuditLogStatusEnum | undefined =
      auditLogStatusEnumSchema.parse(request.query.status);
    const result = await getDesignationsBySevaKendraIdDB(sevaKendraId);
    let filteredDesignations;
    if (status) {
      filteredDesignations = result?.filter(
        (designation) => designation.auditLog[0].status === status
      );
    } else {
      filteredDesignations = result;
    }

    const responseData = createResponseOnlyData(filteredDesignations);
    response.send(responseData);
  } catch (err) {
    next(err);
  }
};

export {
  getDesignationById,
  getDesignation,
  getFeatures,
  getDesignationsBySevaKendraId,
};

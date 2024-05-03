import { NextFunction, Response, Request } from "express";
import { getEducationalQualificationTypeSchema } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import {
  getEducationQualificationTypeByIdDB,
  getEducationQualificationTypeDB,
  getEducationQualificationByEducationQualificationTypeIdDB,
  getEducationQualificationTypeDBTotal,
} from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";
import { EducationQualificationType } from "@prisma/client";
import getRequestSchema, {
  sortOrderEnum,
} from "../../../../types/getRequestSchema.js";
import {
  getEducationQualificationByEducationQualificationTypeIdDBTransaction,
  getEducationQualificationTypeDBTransaction,
} from "../../../../services/database/typeMaster/generalMaster/educationalQualification/transaction/read.js";
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from "../../../../types/createResponseSchema.js";
import { skip } from "node:test";
import prisma from "../../../../services/database/database.js";

async function getEducationQualificationTypeById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    console.log(id);
    const result: getEducationalQualificationTypeSchema | undefined | null =
      await getEducationQualificationTypeByIdDB(prisma, id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

async function getEducationQualificationType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = getRequestSchema.parse(request.query);
    const result = await getEducationQualificationTypeDBTransaction(
      query.start,
      query.rows,
      query.sortOrder,
      query.searchText
    );

    const total: number = result?.total || 0;
    const count: number = result?.educationQualificationType?.length || 0;
    const responseData = createResponseWithQuery(
      result?.educationQualificationType || {},
      query,
      total,
      count
    );

    response.send(responseData);
  } catch (error) {
    next(error);
  }
}

async function getEducationQualificationByEducationQualificationTypeId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const query = getRequestSchema.parse(request.query);
  const id: string = request.params.serviceTypeId;
  const result =
    await getEducationQualificationByEducationQualificationTypeIdDBTransaction(
      id,
      query.start,
      query.rows,
      query.sortOrder
    );

  const total: number = result?.total || 0;
  const count: number = result?.educationQualificationByType?.length || 0;
  const responseData = createResponseWithQuery(
    result || {},
    query,
    total,
    count
  );

  response.send(responseData);
}

export {
  getEducationQualificationTypeById,
  getEducationQualificationType,
  getEducationQualificationByEducationQualificationTypeId,
};

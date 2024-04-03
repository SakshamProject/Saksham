import { NextFunction, Request, Response } from "express";
import getRequestSchema, { getRequestType } from "../../../../types/getRequestSchema.js";
import { getDisabilitySubTypeByDisabilityTypeIdDBTransaction, getDisabilityTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/disabilityType/transaction/read.js";
import { createResponseOnlyData, createResponseWithQuery } from "../../../../types/createResponseSchema.js";
import { getDisabilityTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/disabilityType/read.js";
import prisma from "../../../../services/database/database.js";

async function getDisabilityType(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const query = getRequestSchema.parse(request.query);
  
      const result = await getDisabilityTypeDBTransaction(
        query.start,
        query.rows,
        query.sortOrder,
        query.searchText
      );
  
      const count: number = result?.disabilityType?.length || 0;
      const total: number = result?.total || 0;
      const resultWithRequest = createResponseWithQuery(
        result?.disabilityType || {},
        query,
        total,
        count
      );
  
      response.send(resultWithRequest);
    } catch (err) {
      next(err);
    }
  }

  async function getDisabilityTypeById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = request.params.id;
      const disabilityType =
        await getDisabilityTypeByIdDB(prisma, id);
      const result = createResponseOnlyData(disabilityType ||{});
      response.send(result);
    } catch (err) {
      next(err);
    }
  }

  async function getDisabilitySubTypeByDisabilityTypeId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const query: getRequestType = getRequestSchema.parse(request.query);
      const id = request.params.serviceTypeId;
      const result = await getDisabilitySubTypeByDisabilityTypeIdDBTransaction(
        id,
        query.sortOrder
      );
  
      const count: number = result?.serviceType?.length || 0;
      const total: number = result?.total || 0;
      const resultWithRequest = createResponseWithQuery(
        result?.serviceType || {},
        query,
        total,
        count
      );
  
      response.send(resultWithRequest);
    } catch (err) {
      next(err);
    }
  }

  export{getDisabilityType,getDisabilityTypeById,getDisabilitySubTypeByDisabilityTypeId};
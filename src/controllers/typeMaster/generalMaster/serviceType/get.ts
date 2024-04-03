import { Request, Response, NextFunction } from "express";
import { getServiceTypeWithServiceSchema } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import {
  getServiceByServiceTypeIdDB,
  getServiceTypeByIdDB,
  getServiceTypeDB,
} from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import getRequestSchema from "../../../../types/getRequestSchema.js";
import { Service, ServiceType } from "@prisma/client";
import { createResponseWithQuery } from "../../../../types/createResponseSchema.js";
import { getServiceTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/serviceType/transaction/read.js";

async function getServiceTypeById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const result: getServiceTypeWithServiceSchema | undefined | null =
      await getServiceTypeByIdDB(id);
    response.send(result);
  } catch (err) {
    next(err);
  }
}

async function getServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const query = getRequestSchema.parse(request.query);

  const result = await getServiceTypeDBTransaction(
    query.start,
    query.rows,
    query.sortOrder,
    query.searchText
  );

  const count: number = result?.serviceType?.length || 0;
    const total: number = result?.total || 0;
    const resultWithRequest = createResponseWithQuery(
      result?.serviceType|| {},
      query,
      total,
      count
    );

  response.send(resultWithRequest);
}

async function getServiceByServiceTypeId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const id: string = request.params.serviceTypeId;
  const result: ServiceType[] | undefined = await getServiceByServiceTypeIdDB(
    id
  );

  response.send({
    result: result,
  });
}

export { getServiceTypeById, getServiceType, getServiceByServiceTypeId };

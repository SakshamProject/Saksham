import { NextFunction, Request, Response } from "express";
import {
  getSelectedServiceSchema,
  updateServiceTypeRequestSchema,
  updateServiceTypeRequestSchemaType,
} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import { putServiceTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/serviceType/transaction/update.js";
import prisma from "../../../../services/database/database.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";

function retrieveServicesId(services: getSelectedServiceSchema[] | undefined) {
  try {
    const servicesId: string[] = [];
    if (services) {
      for (let service of services) {
        servicesId.push(service.id);
      }
    }
    return servicesId;
  } catch (err) {
    throw err;
  }
}

async function putServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: updateServiceTypeRequestSchemaType =
      updateServiceTypeRequestSchema.parse(request.body);

    const result = await putServiceTypeDBTransaction(body);
   
    const responseResult = await getServiceTypeByIdDB(
      prisma,
      result
    );

  
    const responseData = createResponseOnlyData(responseResult || {});
    response.send(responseData);
  } catch (err) {

    next(err);

  }
}

export { putServiceType, retrieveServicesId};
import { Request, Response, NextFunction } from "express";
import {
  serviceTypeRequestSchema,
  serviceTypeRequestSchemaType,
} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { Prisma, Service, ServiceType } from "@prisma/client";
import { createPostServiceTypeDBObject } from "../../../../dto/typeMaster/generalMaster/serviceType/post.js";
import { createServiceTypeDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/create.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import prisma from "../../../../services/database/database.js";

async function postServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: serviceTypeRequestSchemaType = serviceTypeRequestSchema.parse(
      request.body
    );

    const postServiceTypeDBObject = createPostServiceTypeDBObject(prisma, body);

    const serviceType: ServiceType | undefined = await createServiceTypeDB(
      prisma,
      postServiceTypeDBObject
    );

    const responseResult = await getServiceTypeByIdDB(prisma, serviceType?.id);
    const responseData = createResponseOnlyData(responseResult || {});

    response.send(responseData);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { postServiceType };

import { Request, Response, NextFunction } from "express";
import {
    serviceTypeRequestSchema,
  serviceTypeRequestSchemaType,
  postServiceType,
} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { Prisma, Service, ServiceType } from "@prisma/client";
import {
  createPostServiceDBObject,
  createPostServiceTypeDBObject,
} from "../../../../dto/typeMaster/generalMaster/serviceType/post.js";
import {
  createServiceDB,
  createServiceTypeDB,
} from "../../../../services/database/typeMaster/generalMaster/serviceType/create.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import { postServiceTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/serviceType/transaction/post.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import prisma from "../../../../services/database/database.js";
import { getDisabilityTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/disabilityType/read.js";


async function postServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try{const body: serviceTypeRequestSchemaType= serviceTypeRequestSchema.parse(request.body);

    const result = await postServiceTypeDBTransaction(body);

    const responseResult = await getServiceTypeByIdDB(prisma,result?.id);
    const responseData = createResponseOnlyData(responseResult ||{});
    
  response.send(responseData);

 }catch(err){
    next(err)
  }
}



export { postServiceType };

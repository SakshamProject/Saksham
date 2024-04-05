import { Request, Response, NextFunction } from "express";
import {
    serviceTypeRequestSchema,
  serviceTypeRequestSchemaType,
} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";

import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import { postServiceTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/serviceType/transaction/post.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import prisma from "../../../../services/database/database.js";


async function postServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try{const body: serviceTypeRequestSchemaType = serviceTypeRequestSchema.parse(request.body);

    const result = await postServiceTypeDBTransaction(body);

    const responseResult = await getServiceTypeByIdDB(prisma,result?.id);
    const responseData = createResponseOnlyData(responseResult ||{});
    
  response.send(responseData);

 }catch(err){
    next(err)
  }
}



export { postServiceType };

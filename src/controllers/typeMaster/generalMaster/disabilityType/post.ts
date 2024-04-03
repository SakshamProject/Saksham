import { NextFunction, Request, Response } from "express";
import { disabilityTypeRequestSchema, disabilityTypeRequestSchemaType } from "../../../../types/typeMaster/generalMaster/disabilityType.js";
import { postDisabilityTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/disabilityType/transaction/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

async function postDisabilityType(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try{const body: disabilityTypeRequestSchemaType= disabilityTypeRequestSchema.parse(request.body);
        console.log("body")
        console.log(body)
  
      const result = await postDisabilityTypeDBTransaction(body);
  
  
      const responseResult = createResponseOnlyData(result ||{});
      
    response.send(responseResult);
  
   }catch(err){
      next(err)
    }
  }
  
  
  
  export { postDisabilityType };
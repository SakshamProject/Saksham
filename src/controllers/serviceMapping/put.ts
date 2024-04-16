import { NextFunction, Request, Response } from "express";
import { putServiceMappingSchema, putServiceMappingSchemaType } from "../../types/serviceMapping/serviceMappingSchema.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { putServiceMappingDBTransaction } from "../../services/database/serviceMapping/transaction/update.js";

async function putServiceMapping(request:Request,response:Response,next:NextFunction){
    try{

  
  const body:putServiceMappingSchemaType = putServiceMappingSchema.parse(request.body);
  const id:string= request.params.id;

  if(request.user){
    const updatedById:string = request.user?.id;
    const result = putServiceMappingDBTransaction(body,id,updatedById);

    //const responseResult = await getServiceMappingByIdDB(result);
  
    const responseData = createResponseOnlyData(result);

    response.send(responseData);

  }

    }catch(err){
        next(err);
    }

}
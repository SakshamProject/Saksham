import { NextFunction, Request, Response } from "express";
import { postServiceMappingRequestSchema, postServiceMappingRequestSchemaType } from "../../types/serviceMapping/serviceMappingSchema.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { postServiceMappingDBTransaction } from "../../services/database/serviceMapping/transaction/create.js";

async function postServiceMapping(request:Request,response:Response,next:NextFunction){
    try{

        const body:postServiceMappingRequestSchemaType = postServiceMappingRequestSchema.parse(request.body);
        if(request.user){
        const createdById:string |undefined= request.user?.id;
        const result =await postServiceMappingDBTransaction(body,createdById);
       // const responseResult = await getServiceMappingByIdDB(result?.id);
        const responseData = createResponseOnlyData(result ||{});
        response.send(responseData);
        }
    }catch(err){
    next(err);
}
}


export {postServiceMapping};
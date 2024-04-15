import { NextFunction, Request, Response } from "express";
import { postServiceMappingRequestSchema, postServiceMappingRequestSchemaType } from "../../types/serviceMapping/serviceMappingSchema.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { postServiceMappingDBTransaction } from "../../services/database/serviceMapping/transaction/post.js";

async function postServiceMapping(request:Request,response:Response,next:NextFunction){
    try{

        const body:postServiceMappingRequestSchemaType = postServiceMappingRequestSchema.parse(request.body);
        console.log(`[+]body`,body)
        if(request.user){
        const createdById:string |undefined= request.user?.id;
        const result =await postServiceMappingDBTransaction(body,createdById);
        console.log(`[+]resilt`,result)
       // const responseResult = await getServiceMappingByIdDB(result?.id);
        const responseData = createResponseOnlyData(result ||{});
        response.send(responseData);
        }
    }catch(err){
    next(err);
}
}


export {postServiceMapping};
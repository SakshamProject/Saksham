import { NextFunction, Request, Response } from "express";
import { deleteServiceTypeDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/delete.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

async function deleteServiceType(request:Request,response:Response, next:NextFunction){
    try
   { const id:string =request.params.id;
    const deletedService = await deleteServiceTypeDB(id);
    const resultdata = createResponseOnlyData(deletedService||{});
    response.send(resultdata);
    }catch(err){
        
        next(err)
}
}
export {deleteServiceType};
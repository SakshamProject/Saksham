import { NextFunction, Request, Response } from "express";
import { deleteServiceTypeDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/delete.js";

async function deleteServiceType(request:Request,response:Response, next:NextFunction){
    try
   { const id:string =request.params.id;
    const deletedService = await deleteServiceTypeDB(id);
    response.send(deletedService);
    }catch(err){
        
        next(err)
}
}
export {deleteServiceType};
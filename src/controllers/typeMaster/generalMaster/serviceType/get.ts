import { Request, Response,NextFunction } from "express";
import { getServiceTypeWithServiceSchema } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";


async function getServiceTypeById(request:Request, response:Response, next:NextFunction){
    try{
        const id = request.params.id;
        console.log(id)
        const result:getServiceTypeWithServiceSchema|undefined|null = await getServiceTypeByIdDB(id);
        response.send(result);
    }catch(err){
        
        next(err);
    }
}
export {getServiceTypeById};
import { Service, ServiceType } from "@prisma/client";
import { postServiceType, postServiceTypeType } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function createServiceTypeDB(prismaTransaction:any, data:postServiceTypeType){
try{
    
    const serviceType = await prismaTransaction.serviceType.create({
        data:data,
    })
 
    return serviceType;
}catch(err){
    if (err instanceof Error) {
        throwDatabaseError(err);
      }
}
}

async function createServiceDB(prismaTransaction:any, data:postServiceType){
    try{
        const service:Service= await prismaTransaction.service.create({
            data:data
        })
        return service;
      
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }    

}

export {createServiceTypeDB,createServiceDB};
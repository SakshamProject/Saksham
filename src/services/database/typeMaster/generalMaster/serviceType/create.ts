import { Service, ServiceType } from "@prisma/client";
import prisma from "../../../database.js";
import { postServiceType, postServiceTypeType } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function createServiceTypeDB(data:postServiceTypeType){
try{
    
    const serviceType = await prisma.serviceType.create({
        data:data,
    })
 
    return serviceType;
}catch(err){
    if (err instanceof Error) {
        throwDatabaseError(err);
      }
}
}

async function createServiceDB(data:postServiceType){
    try{
        const service:Service= await prisma.service.create({
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
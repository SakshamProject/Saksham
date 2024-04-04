import { Service, ServiceType } from "@prisma/client";
import prisma from "../../../database.js";
import { postServiceType, postServiceTypeType, serviceNameSchemaType } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import { createPostServiceDBObject } from "../../../../../dto/typeMaster/generalMaster/serviceType/post.js";

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
        console.log("create db layer")
        console.log(service)
        return service;
      
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }    

}

async function createCheckedServices(prismaTransaction:any,services:serviceNameSchemaType[],updatedServiceTypeId:string|undefined){

    try{
      const checkedServicesId:string[]|undefined =[];
     
     for(let service of services){
 
         if (!service.id){
 
             const postServiceDBObject: postServiceType = createPostServiceDBObject(prisma,
                 service.name,
                 updatedServiceTypeId
               );
 
               const createdService:Service|undefined = await createServiceDB(prisma,postServiceDBObject);
 
                 if(createdService){
                     checkedServicesId.push(createdService.id)
                 }
               }
         else{
             if(service){
                 checkedServicesId.push(service.id)
             }
         }
     }
     return checkedServicesId;   
 }catch(err){
     throw err;
 }
 }

export {createServiceTypeDB,createServiceDB,createCheckedServices};
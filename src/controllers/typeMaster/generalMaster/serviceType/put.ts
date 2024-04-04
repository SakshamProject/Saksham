import { NextFunction, Request, Response } from "express";
import {
  getSelectedServiceSchema,
  getServiceTypeWithServiceSchema,
  postServiceType,
  serviceNameSchemaType,
  updateServiceTypeRequestSchema,
  updateServiceTypeRequestSchemaType,
} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { updateServiceTypeDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/update.js";
import { createUpdateServiceTypeObject } from "../../../../dto/typeMaster/generalMaster/serviceType/put.js";
import {
  deleteServiceTypeDB,
  deleteUncheckedServices,
} from "../../../../services/database/typeMaster/generalMaster/serviceType/delete.js";
import { createPostServiceDBObject } from "../../../../dto/typeMaster/generalMaster/serviceType/post.js";
import {
  createCheckedServices,
  createServiceDB,
} from "../../../../services/database/typeMaster/generalMaster/serviceType/create.js";
import { Service } from "@prisma/client";
import { getServiceByServiceTypeIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import { putServiceTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/serviceType/transaction/update.js";

function retrieveServicesId(services: getSelectedServiceSchema[] | undefined) {
  try {
    const servicesId: string[] = [];
    if (services) {
      for (let service of services) {
        servicesId.push(service.id);
    }
   }
    return servicesId; 
} catch(err){
    throw(err);
}  

}

async function deleteUncheckedServices(existingServicesId:string[],updatedServicesId:string[]){
    
    try{
        for(let existingId of existingServicesId){

        if(!updatedServicesId.includes(existingId)){
            const deletedService = await deleteServiceTypeDB(existingId);
        }
    }
}catch(err){

    throw(err);
}
}

async function createCheckedServices(services:serviceNameSchemaType[],updatedServiceTypeId:string|undefined){

   try{
     const checkedServicesId:string[]|undefined =[];
    
    for(let service of services){

        if (!service.id){

            const postServiceDBObject: postServiceType = createPostServiceDBObject(
                service.name,
                updatedServiceTypeId
              );

              const createdService:Service|undefined = await createServiceDB(postServiceDBObject);

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

async function putServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: updateServiceTypeRequestSchemaType =
      updateServiceTypeRequestSchema.parse(request.body);

    const result = await putServiceTypeDBTransaction(body);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (err) {
    next(err);
  }
}

export { putServiceType, retrieveServicesId };
import { Prisma } from "@prisma/client";
import { postRequestSchemaType } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";

function createPostServiceTypeDBObject(body:postRequestSchemaType){

    const postServiceTypeDBObject:Prisma.ServiceTypeCreateInput = {
        name:body.serviceType
    }
    return postServiceTypeDBObject;
}

function createPostServiceDBObject(serviceName:string, serviceTypeId:string|undefined){

    const postServiceDBObject:Prisma.ServiceCreateInput = {
        name:serviceName,
        serviceType: {
            connect: { id: serviceTypeId} 
        }
    }
    return postServiceDBObject;
}

export {createPostServiceTypeDBObject,createPostServiceDBObject};
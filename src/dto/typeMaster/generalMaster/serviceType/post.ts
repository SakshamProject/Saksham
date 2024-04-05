import { Prisma } from "@prisma/client";
import { serviceTypeRequestSchemaType} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";

function createPostServiceTypeDBObject(prismaTransaction:any,body:serviceTypeRequestSchemaType){

    const postServiceTypeDBObject:Prisma.ServiceTypeCreateInput = {
        name:body.serviceType
    }
    return postServiceTypeDBObject;
}

function createPostServiceDBObject(prismaTransaction:any, serviceName:string, serviceTypeId:string|undefined){

    const postServiceDBObject:Prisma.ServiceCreateInput = {
        name:serviceName,
        serviceType: {
            connect: { id: serviceTypeId} 
        }
    }
    return postServiceDBObject;
}

export {createPostServiceTypeDBObject,createPostServiceDBObject};
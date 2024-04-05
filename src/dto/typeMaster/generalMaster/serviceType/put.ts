import {  updateServiceTypeRequestSchemaType, updateServiceTypeType } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";

function createUpdateServiceTypeObject(prismaTransaction:any, body:updateServiceTypeRequestSchemaType,id:string){
    const UpdateServiceTypeObject:updateServiceTypeType = {
        id:id,
        name:body.serviceType
    }
    return UpdateServiceTypeObject;
}

export {createUpdateServiceTypeObject};
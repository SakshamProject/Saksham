import {  updateServiceTypeRequestSchemaType, updateServiceTypeType } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";

function createUpdateServiceTypeObject(body:updateServiceTypeRequestSchemaType){
    const UpdateServiceTypeObject:updateServiceTypeType = {
        id:body.id,
        name:body.serviceType
    }
    return UpdateServiceTypeObject;
}

export {createUpdateServiceTypeObject};
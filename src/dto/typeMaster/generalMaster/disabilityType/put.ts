import { updateDisabilityTypeRequestSchemaType, updateDisabilityTypeType } from "../../../../types/typeMaster/generalMaster/disabilityType.js";

function createUpdateDisabilityTypeObject(prismaTransaction:any, body:updateDisabilityTypeRequestSchemaType){
    const UpdateServiceTypeObject:updateDisabilityTypeType = {
        id:body.id,
        name:body.disabilityType
    }
    return UpdateServiceTypeObject;
}

export {createUpdateDisabilityTypeObject};
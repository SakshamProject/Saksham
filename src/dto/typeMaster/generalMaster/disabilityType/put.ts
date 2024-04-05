import { updateDisabilityTypeRequestSchemaType, updateDisabilityTypeType } from "../../../../types/typeMaster/generalMaster/disabilityType.js";

function createUpdateDisabilityTypeObject(prismaTransaction:any, body:updateDisabilityTypeRequestSchemaType,id:string){
    const UpdateServiceTypeObject:updateDisabilityTypeType = {
        id:id,
        name:body.disabilityType
    }
    return UpdateServiceTypeObject;
}

export {createUpdateDisabilityTypeObject};
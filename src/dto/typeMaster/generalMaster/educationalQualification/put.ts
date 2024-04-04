import { updateEducationQualificationTypeRequestSchemaType, updateEducationQualificationTypeType } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";

function createUpdateEducationQualificationTypeObject(prismaTransaction: any, body:updateEducationQualificationTypeRequestSchemaType){
    const UpdateEducationQualificationTypeObject:updateEducationQualificationTypeType = {
        id:body.id,
        name:body.name
    }
    return UpdateEducationQualificationTypeObject;
}

export {createUpdateEducationQualificationTypeObject};
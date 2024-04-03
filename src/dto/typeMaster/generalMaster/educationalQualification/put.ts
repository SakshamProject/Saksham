import { updateEducationQualificationTypeRequestSchemaType, updateEducationQualificationTypeType } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";

function createUpdateEducationQualificationTypeObject(body:updateEducationQualificationTypeRequestSchemaType){
    const UpdateEducationQualificationTypeObject:updateEducationQualificationTypeType = {
        id:body.id,
        name:body.educationQualificationTypeName
    }
    return UpdateEducationQualificationTypeObject;
}

export {createUpdateEducationQualificationTypeObject};
import { updateEducationQualificationTypeRequestSchemaType, updateEducationQualificationTypeType } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";

function createUpdateEducationQualificationTypeObject(prismaTransaction: any, body:updateEducationQualificationTypeRequestSchemaType){
    const UpdateEducationQualificationTypeObject:updateEducationQualificationTypeType = {
        name:body.name,
    }
    return UpdateEducationQualificationTypeObject;
}

export {createUpdateEducationQualificationTypeObject};
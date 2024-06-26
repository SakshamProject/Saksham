import { EducationQualification } from "@prisma/client";
import { educationQualificationNameSchemaType, getEducationQualificationTypeWithEducationQualificationSchema, getSelectedEducationQualificationSchema, postEducationQualification, updateEducationQualificationTypeRequestSchema, updateEducationQualificationTypeRequestSchemaType } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { NextFunction, Response, Request } from "express";
import { deleteEducationQualificationTypeDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/delete.js";
import { createUpdateEducationQualificationTypeObject } from "../../../../dto/typeMaster/generalMaster/educationalQualification/put.js";
import { updateEducationQualificationTypeDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/update.js";
import { getEducationQualificationByEducationQualificationTypeIdDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";
import { createPostEducationQualificationDBObject } from "../../../../dto/typeMaster/generalMaster/educationalQualification/post.js";
import { createEducationQualificationDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/create.js";
import { updateEducationQualificationTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/transaction/update.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import prisma from "../../../../services/database/database.js";

function retrieveEducationQualificationsId(educationQualifications:getSelectedEducationQualificationSchema[]|undefined){

   try{
     const educationQualificationsId:string[] = [];
   if(educationQualifications){
    for(let educationQualification of educationQualifications){
        educationQualificationsId.push(educationQualification.id);
    }
   }
    return educationQualificationsId; 
    } catch(err){
    throw(err);
    }  

}

async function deleteUncheckedEducationQualifications(existingEducationQualificationsId:string[],updatedEducationQualificationsId:string[]){
    
    try{
        for(let existingId of existingEducationQualificationsId){

        if(!updatedEducationQualificationsId.includes(existingId)){
            const deletedEducationQualification = await deleteEducationQualificationTypeDB(existingId);
        }
    }
}catch(err){

    throw(err);
}
}

async function createCheckedEducationQualifications(educationQualifications:educationQualificationNameSchemaType[],updatedEducationQualificationTypeId:string|undefined){

   try{
     const checkedEducationQualificationsId:string[]|undefined =[];
    
    for(let educationQualification of educationQualifications){

        if (!educationQualification.id){

            const postEducationQualificationDBObject: postEducationQualification = createPostEducationQualificationDBObject(
                educationQualification.name,
                updatedEducationQualificationTypeId
              );

              const createdEducationQualification:EducationQualification|undefined = await createEducationQualificationDB(prisma, postEducationQualificationDBObject);

                if(createdEducationQualification){
                    checkedEducationQualificationsId.push(createdEducationQualification.id)
                }
              }
        else{
            if(educationQualification){
                checkedEducationQualificationsId.push(educationQualification.id)
            }
        }
    }
    return checkedEducationQualificationsId;   
}catch(err){
    throw err;
}
}


async function putEducationQualificationType(request:Request, response:Response,next:NextFunction){

    try{
        const id = request.params.id
        const body: updateEducationQualificationTypeRequestSchemaType = updateEducationQualificationTypeRequestSchema.parse(request.body);

        const result = await updateEducationQualificationTypeDBTransaction(id, body);
        const responseData = createResponseOnlyData(result || {});
        response.send(responseData)
    }catch(err){
        next(err)
    } 
}

export {putEducationQualificationType, retrieveEducationQualificationsId};
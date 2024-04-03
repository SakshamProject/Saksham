import { EducationQualification } from "@prisma/client";
import { educationQualificationNameSchemaType, getEducationQualificationTypeWithEducationQualificationSchema, getSelectedEducationQualificationSchema, postEducationQualification, updateEducationQualificationTypeRequestSchema, updateEducationQualificationTypeRequestSchemaType } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { NextFunction, Response, Request } from "express";
import { deleteEducationQualificationTypeDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/delete.js";
import { createUpdateEducationQualificationTypeObject } from "../../../../dto/typeMaster/generalMaster/educationalQualification/put.js";
import { updateEducationQualificationTypeDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/update.js";
import { getEducationQualificationByEducationQualificationTypeIdDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";
import { createPostEducationQualificationDBObject } from "../../../../dto/typeMaster/generalMaster/educationalQualification/post.js";
import { createEducationQualificationDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/create.js";

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

              const createdEducationQualification:EducationQualification|undefined = await createEducationQualificationDB(postEducationQualificationDBObject);

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
        const body:updateEducationQualificationTypeRequestSchemaType= updateEducationQualificationTypeRequestSchema.parse(request.body);

        const updateEducationQualificationTypeObject = createUpdateEducationQualificationTypeObject(body);
    
        const updatedEducationQualificationType:getEducationQualificationTypeWithEducationQualificationSchema|undefined = await updateEducationQualificationTypeDB(updateEducationQualificationTypeObject,body.id);

        const existingEducationQualifications = await getEducationQualificationByEducationQualificationTypeIdDB(body.id);
    
        const existingEducationQualificationsId:string[]|undefined = retrieveEducationQualificationsId(existingEducationQualifications);
    
        const educationQualifications = body.educationQualificationName;

        const checkedEducationQualificationsId:string[] = await createCheckedEducationQualifications(educationQualifications,updatedEducationQualificationType?.id)
    
       await deleteUncheckedEducationQualifications(existingEducationQualificationsId,checkedEducationQualificationsId );
       
        response.send( updatedEducationQualificationType)
      
    }catch(err){
        next(err)
    } 
}

export {putEducationQualificationType};
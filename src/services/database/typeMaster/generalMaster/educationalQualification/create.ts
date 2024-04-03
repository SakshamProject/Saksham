import { EducationQualification } from "@prisma/client";
import { postEducationalQualificationType, postEducationQualification } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function createEducationQualificationTypeDB(data:postEducationalQualificationType){
try{
    
    const educationQualificationType = await prisma.educationQualificationType.create({
        data:data,
    })
 
    return educationQualificationType;
}catch(err){
    if (err instanceof Error) {
        throwDatabaseError(err);
      }
}
}

async function createEducationQualificationDB(data:postEducationQualification){
    try{
        const educationQualification:EducationQualification= await prisma.educationQualification.create({
            data:data
        })
        return educationQualification;
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }    

}

export { createEducationQualificationDB, createEducationQualificationTypeDB };
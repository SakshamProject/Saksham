import { updateEducationQualificationTypeType } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function updateEducationQualificationTypeDB(updateObject:updateEducationQualificationTypeType,id:string|undefined){

  try{
    const updatedEducationQualificationType = await prisma.educationQualificationType.update({
      where: {
        id: id,
      },
      include:{
        educationQualification:true
      },
      data:updateObject
    });

    return updatedEducationQualificationType;
  }catch(err){
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
   
}
export {updateEducationQualificationTypeDB};
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function deleteEducationQualificationTypeDB(id:string){
    try
 {   const deletedEducationQualification = await prisma.educationQualificationType.delete(
        {
            where:{
                id:id
            }
        }
    )
    return deletedEducationQualification;
    
}catch(err){
    if (err instanceof Error) {
        console.log(err)
        throwDatabaseError(err);
      }
    }
}
export{ deleteEducationQualificationTypeDB }
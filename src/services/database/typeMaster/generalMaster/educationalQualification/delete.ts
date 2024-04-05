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

async function deleteEducationQualificationDB(id: string) {
    try {
      const deletedEducationQualification = await prisma.educationQualification.delete({
        where: {
          id: id,
        },
      });
      return deletedEducationQualification;
    } catch (err) {
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  }
  
  async function deleteUncheckedEducationQualifications(
    prismaTransaction: any,
    existingEducationQualificationsId: string[],
    updatedEducationQualificationsId: string[]
  ) {
    try {
      for (let existingId of existingEducationQualificationsId) {
        if (!updatedEducationQualificationsId.includes(existingId)) {
          const deletedEducationQualification = await deleteEducationQualificationTypeDB(existingId);
        }
      }
    } catch (err) {
      throw err;
    }
  }

export{ deleteEducationQualificationTypeDB, deleteEducationQualificationDB, deleteUncheckedEducationQualifications }
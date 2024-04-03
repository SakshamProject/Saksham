import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function deleteEducationQualificationTypeDB(id:string){
    try
 {   const deletedService = prisma.serviceType.delete(
        {
            where:{
                id:id
            }
        }
    )
    return deletedService;
}catch(err){
    
    if (err instanceof Error) {
        throwDatabaseError(err);
      }
}
}
export{ deleteEducationQualificationTypeDB }
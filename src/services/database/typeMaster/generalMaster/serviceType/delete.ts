import { getServiceTypeWithServiceSchema } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function deleteServiceTypeDB(id:string){
    console.log("[+]Enters delete")

    try
 {   const deletedService = await  prisma.service.delete(
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

async function deleteServiceDB(id:string){
    try{
        const deletedService = await prisma.service.delete({
            where:{
                id:id
            }
        })
        return deletedService;
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }

}

export{deleteServiceTypeDB,deleteServiceDB};
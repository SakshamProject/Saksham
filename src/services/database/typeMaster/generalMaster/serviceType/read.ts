import { getServiceTypeWithServiceSchema } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js"
import prisma from "../../../database.js"
import throwDatabaseError from "../../../utils/errorHandler.js";
//import prisma from "../database.js";

async function getServiceTypeByIdDB(id:string|undefined){
    try{  
        const serviceType:getServiceTypeWithServiceSchema|null = await prisma.serviceType.findUnique({
        where: {
            id: id,
          },
          include: {
            service: {
              select: {
                name: true, 
              },
            },
          },

        });
        return serviceType;
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }
}

export{getServiceTypeByIdDB}
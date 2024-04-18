import { Prisma } from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import { serviceMappingUpdateType } from "../../../types/serviceMapping/serviceMappingSchema.js";

async function updateServiceMappingDB(prismaTransaction:Prisma.TransactionClient,dataObject:serviceMappingUpdateType,id:string){
    try{

        const serviceMapping = await prismaTransaction.divyangServiceMapping.update({
            where: {
                id: id,
              },
             
              data:dataObject
        })
        return serviceMapping;

    }catch(err){
        if(err instanceof Error){
            throwDatabaseError(err);
        }
    }

}
export{updateServiceMappingDB}
import { updateServiceTypeType } from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function updateServiceTypeDB(prismaTransaction:any, updateObject:updateServiceTypeType,id:string|undefined){

  try{
    const updatedServiceType = await prisma.serviceType.update({
      where: {
        id: id,
      },
      include:{
        service:true
      },
      data:updateObject
    });

    return updatedServiceType;
  }catch(err){
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
   
}
export {updateServiceTypeDB};
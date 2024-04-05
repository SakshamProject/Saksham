import { updateDisabilityTypeType } from "../../../../../types/typeMaster/generalMaster/disabilityType.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function updateDisabilityTypeDB(prismaTransaction:any, updateObject:updateDisabilityTypeType,id:string|undefined){

    try{
      const updatedDisabilityType = await prismaTransaction.disabilityType.update({
        where: {
          id: id,
        },
        include:{
          disability:true
        },
        data:updateObject
      });
  
      return updatedDisabilityType;
    }catch(err){
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
     
  }
  export {updateDisabilityTypeDB};
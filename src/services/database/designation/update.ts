import { Prisma } from "@prisma/client";
import { updateDesignationObjectType, updateDesignationRequestSchemaType } from "../../../types/designation/designationSchema.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function updateDesignationDB(prismaTransaction:Prisma.TransactionClient, updateObject:updateDesignationObjectType,id:string|undefined){
 
    try{
      const updatedDesignation = await prismaTransaction.designation.update({
        where: {
          id: id,
        },
       
        data:updateObject
      }
        );
  
      return updatedDesignation;
    }catch(err){
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
     
  }
  export {updateDesignationDB};
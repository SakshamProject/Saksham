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

async function getDesignationStatus(prismaTransaction:Prisma.TransactionClient,designationId:string){
  const currentDate = new Date().toISOString();
  const status =await prismaTransaction.designation.findFirst({
    where:{
      id:designationId
    },
    include: {
      designationAuditLog: {
          where: {
              date:{
                lt :currentDate
              } 
          },
          orderBy: {
              date:'desc'
          },
          take: 1
      }
  }
  })
  return status?.designationAuditLog[0].status;
}

  export {updateDesignationDB,getDesignationStatus};
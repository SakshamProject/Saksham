import { Prisma } from "@prisma/client";
import { updateDesignationObjectType, updateDesignationRequestSchemaType } from "../../../types/designation/designationSchema.js";
import throwDatabaseError from "../utils/errorHandler.js";
import prisma from "../database.js";

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

async function getDesignationStatus(designationId:string,currentDate:string){
 
try {
    const status =await prisma.designation.findFirst({
      where:{
        id:designationId
      },
      include: {
        auditLog: {
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
    return status?.auditLog[0];
} catch (error) {
  if (error instanceof Error) {
    throwDatabaseError(error);
  }
}
}

async function getDesignationDependencyStatusDB(prismaTransaction:Prisma.TransactionClient,designationId:string){
try {
  const designation = await prismaTransaction.designation.findUniqueOrThrow({
    where:{
      id:designationId
    },
    include:{
      users:true
    }
  });
  const dependencyStatus  = designation.users.length===0? false:true;
  return dependencyStatus;
} catch (error) {
  if (error instanceof Error) {
    throwDatabaseError(error);
  }
}

}

  export {updateDesignationDB,getDesignationStatus,getDesignationDependencyStatusDB};
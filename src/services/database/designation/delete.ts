import { Designation, Prisma } from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function deleteDesignationDB(id:string){

try{
  const deletedDesignation:Designation = await prisma.designation.delete({
    where: {
      id: id,
    },
    include:{
      sevaKendra:true
    }
  })
  return deletedDesignation;
}catch(err){
if (err instanceof Error) {
  throwDatabaseError(err);
}
  }
}

async function deleteFeaturesOndesignationsDB(prismaTransaction:Prisma.TransactionClient,designationId:string,featureId:string){
  try{
    console.log(`[+]featureIdToBeDeled`,featureId)
    const deletedDesignation = await prismaTransaction.featuresOnDesignations.deleteMany({
      where: {
        AND:[
          {
            designationId:designationId
          },
          {
            featureId:featureId
          }
        ]
      },
      
    })
    console.log(`[+]deletedDesignation`,deletedDesignation)
    return deletedDesignation;
  }catch(err){
  if (err instanceof Error) {
    throwDatabaseError(err);
  }
    }
}

  export {deleteDesignationDB,deleteFeaturesOndesignationsDB}
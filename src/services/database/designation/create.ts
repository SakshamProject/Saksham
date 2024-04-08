import { Designation } from "@prisma/client";
import { postDesignationType, postFeaturesOnDesignationsType } from "../../../types/designation/designationSchema.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function createDesignationDB(
    prismaTransaction:any,
  dataObject:postDesignationType){
    try{
      const newDesignation:Designation = await prismaTransaction.designation.create({
        data:dataObject
  
      });
  
      return newDesignation;
    }catch(err){
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  
  }
  
  async function createFeaturesOnDesignationDB(prismaTransaction:any,FeaturesOnDesignationsDBObjects:postFeaturesOnDesignationsType){
   try{
    const featuresOnDesignations = await prismaTransaction.featuresOnDesignations.create({
        data:FeaturesOnDesignationsDBObjects
      })
      return featuresOnDesignations;
   }catch(err){
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
   
  }
  export {createDesignationDB,createFeaturesOnDesignationDB}
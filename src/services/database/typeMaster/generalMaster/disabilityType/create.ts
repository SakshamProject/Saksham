import { DisabilitySubType, Service } from "@prisma/client";
import { disabilitySchemaType, postDisabilitySubTypeType, postDisabilityTypeType } from "../../../../../types/typeMaster/generalMaster/disabilityType.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import { createPostDisabilitySubTypeDBObject } from "../../../../../dto/typeMaster/generalMaster/disabilityType/post.js";

async function createDisabilityTypeDB(prismaTransaction:any, data:postDisabilityTypeType){
    console.log("enters createDB")
    try{
        
        const disabilityType = await prismaTransaction.disabilityType.create({
            data:data,
        })
     console.log(disabilityType)
        return disabilityType;
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }
    }

    async function createDisabilitySubTypeDB(prismaTransaction:any, data:postDisabilitySubTypeType){
        try{
            const disabilitySubType:DisabilitySubType= await prismaTransaction.disabilitySubType.create({
                data:data
            })
            return disabilitySubType;
        }catch(err){
            if (err instanceof Error) {
                throwDatabaseError(err);
              }
        }    
    
    }

    async function createCheckedDisabilitySubTypes(prismaTransaction:any,disabilities:disabilitySchemaType[],updatedDisabilitySubTypeId:string|undefined){

        try{
          const checkedServicesId:string[]|undefined =[];
         
         for(let disability of disabilities){
     
             if (!disability.id){
     
                 const postServiceDBObject: postDisabilitySubTypeType = createPostDisabilitySubTypeDBObject(prisma,
                    disability.name,
                     updatedDisabilitySubTypeId
                   );
     
                   const createdDisabilitySubType:DisabilitySubType|undefined = await createDisabilitySubTypeDB(prisma,postServiceDBObject);
     
                     if(createdDisabilitySubType){
                         checkedServicesId.push(createdDisabilitySubType.id)
                     }
                   }
             else{
                 if(disability){
                     checkedServicesId.push(disability.id)
                 }
             }
         }
         return checkedServicesId;   
     }catch(err){
         throw err;
     }
     }

    export {createDisabilityTypeDB,createDisabilitySubTypeDB,createCheckedDisabilitySubTypes};
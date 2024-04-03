import { DisabilitySubType, Service } from "@prisma/client";
import { postDisabilitySubTypeType, postDisabilityTypeType } from "../../../../../types/typeMaster/generalMaster/disabilityType.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

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

    export {createDisabilityTypeDB,createDisabilitySubTypeDB};
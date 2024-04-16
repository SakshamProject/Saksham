import { Prisma } from "@prisma/client";
import { donorSchemaType, putServiceMappingSchemaType, serviceMappingUpdateType } from "../../types/serviceMapping/serviceMappingSchema.js";

function createPostDonorObject(donorDetails:donorSchemaType){

    const postDonorObject = {
        name:donorDetails.name,
        contact:donorDetails.contact,
        address :donorDetails.address
    }
return postDonorObject
}

function createupdateServiceMappingDBObject(body:putServiceMappingSchemaType,updatedById:string,donorId:string=""){

    const updateServiceMappingDBObject:serviceMappingUpdateType={

        isCompleted:body.isCompleted,
        completedDate:body.completedDate,
        howTheyGotService:body.howTheyGotService,
        updatedBy:{
            connect:{
                id:updatedById
            }
        }
        
        }
       
    
    if(donorId===""){
        return updateServiceMappingDBObject;
    }else{
         updateServiceMappingDBObject.donor={
            connect:{
                id:donorId
            }
        }
        return updateServiceMappingDBObject;
    }

}

export {createPostDonorObject,createupdateServiceMappingDBObject};
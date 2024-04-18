import { StatusEnum } from "@prisma/client";
import {  postServiceMappingRequestSchemaType, postServiceMappingType } from "../../types/serviceMapping/serviceMappingSchema.js";

const createPostServiceMappingDBObject = (
    body: postServiceMappingRequestSchemaType,
    createdById: string = ""
  ) => {
    const createServiceMappingDBObject : postServiceMappingType
     = {
     divyang:{
        connect:{
            id:body.divyangId
        }
     },
     service:{
        connect:{
            id:body.serviceId
        }
     },

     sevaKendra:{
      connect:{
        id:body.sevaKendraId
      }
     },
     dateOfService:body.dateOfService,
     followUpDate:body.dateOfService,
     dueDate:body.dueDate,
     isNonSevaKendraFollowUpRequired:body.isNonSevaKendraFollowUpRequired,
     isCompleted:StatusEnum.PENDING,
      createdBy: {
        connect: {
          id: createdById,
        },
      },
      updatedBy: {
        connect: {
          id: createdById,
        },
      },
    };

    if (body.userId) {
      createServiceMappingDBObject.user = {
        connect: {
          id: body.userId,
        },
      };
    }

    if(body.divyangId ===undefined){
      createServiceMappingDBObject.divyang ={
        connect:{
          id:createdById
        }
      }
    }
  
    return createServiceMappingDBObject;
  };

    
  

  function createPostNonSevaKendraFollowUpDBObject(body:any,serviceMappingId:string=""){
    if(body.nonSevaKendraFollowUp){
      const PostNonSevaKendraFollowUpDBObject = {
        name:body.nonSevaKendraFollowUp.name,
        mobileNumber:body.nonSevaKendraFollowUp.mobileNumber,
        email:body.nonSevaKendraFollowUp.email,
        sendMail:body.nonSevaKendraFollowUp.sendMail,
        sevaKendra:undefined,
        divyangServiceMapping:{
            connect:{
                id:serviceMappingId
            }
        }
    }
    return PostNonSevaKendraFollowUpDBObject;
    }
    
   
  }

  export {createPostServiceMappingDBObject,createPostNonSevaKendraFollowUpDBObject};
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

     startDate:body.startDate,
     followUpDate:body.startDate,
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
  
    return createServiceMappingDBObject;
  };

    
  

  function createPostNonSevaKendraFollowUpDBObject(body:postServiceMappingRequestSchemaType,serviceMappingId:string=""){
    if(body.nonSevaKendraFollowUp){
      const PostNonSevaKendraFollowUpDBObject = {
        name:body.nonSevaKendraFollowUp.name,
        mobileNumber:body.nonSevaKendraFollowUp.mobileNumber,
        email:body.nonSevaKendraFollowUp.email,
        sendMail:body.nonSevaKendraFollowUp.sendMail,
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
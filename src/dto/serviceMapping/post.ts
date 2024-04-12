import { StatusEnum } from "@prisma/client";
import { postServiceMappingRequestSchemaType } from "../../types/serviceMapping/serviceMappingSchema.js";

const createPostServiceMappingDBObject = (
    body: postServiceMappingRequestSchemaType,
    createdById: string = ""
  ) => {
    const createServiceMappingDBObject = {
     divyang:{
        connect:{
            id:body.divyangId
        }
     },
     user:{
        connect:{
            id:body.userId
        }
     },
     service:{
        connect:{
            id:body.serviceId
        }
     },
     dateOfService:body.dateOfService,
     dueDate:body.dueDate,
     isNonSevaKendraFollowUpRequired:body.isNonSevaKendraVolunteerRequired,
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
    return createServiceMappingDBObject;
  };

  function createPostNonSevaKendraFollowUpDBObject(body:postServiceMappingRequestSchemaType,serviceMappingId:string=""){
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

  export {createPostServiceMappingDBObject,createPostNonSevaKendraFollowUpDBObject};
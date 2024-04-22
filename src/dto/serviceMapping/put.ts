import { Prisma, StatusEnum } from "@prisma/client";
import { donorSchemaType, putServiceMappingSchemaType, serviceMappingUpdateType } from "../../types/serviceMapping/serviceMappingSchema.js";


function createPostDonorObject(donorDetails: donorSchemaType) {
  const postDonorObject = {
    name: donorDetails.name,
    contact: donorDetails.contact,
    address: donorDetails.address,
  };
  return postDonorObject;
}

function createupdateServiceMappingCompletionDBObject(
  body: putServiceMappingSchemaType,
  updatedById: string,
  donorId: string = ""
) {
  const updateServiceMappingDBObject: serviceMappingUpdateType = {
    isCompleted: body.isCompleted,
    completedDate: body.completedDate,
    howTheyGotService: body.howTheyGotService,
    sevaKendra:undefined,
    updatedBy: {
      connect: {
        id: updatedById,
      },
    },
  };

  if (donorId === "") {
    return updateServiceMappingDBObject;
  } else {
    updateServiceMappingDBObject.donor = {
      connect: {
        id: donorId,
      },
    };
    return updateServiceMappingDBObject;
  }
}


function createUpdateServiceMappingStoppedDBObject(body:putServiceMappingSchemaType,updatedById:string){
    const UpdateServiceMappingStoppedDBObject={
        isCompleted:body.isCompleted,
        completedDate:body.completedDate,
        sevakendra:undefined,
        reasonForNonCompletion:body.reasonForNonCompletion,
        updatedBy:{
          connect:{
            id:updatedById
          }
        }
    }
return UpdateServiceMappingStoppedDBObject;
}


function createUpdateServiceMappingWithNonSevaKendraFollowUpDBObject(body:putServiceMappingSchemaType,updatedById:string){
  const UpdateServiceMappingWithNonSevaKendraFollowUpDBObject={
    user:undefined,
    isNonSevaKendraFollowUpRequired:body.isNonSevaKendraFollowUpRequired,
    isCompleted:body.isCompleted,
    sevakendra:undefined,
    reasonForNonCompletion:body.reasonForNonCompletion,
    updatedBy:{
      connect:{
        id:updatedById
      }
    }
  }
  return UpdateServiceMappingWithNonSevaKendraFollowUpDBObject;
}

function createUpdateServiceMappingWithSevaKendraFollowUpDBObject(body:putServiceMappingSchemaType,updatedById:string){
const UpdateServiceMappingWithSevaKendraFollowUpDBObject={
  user:{
    connect:{
      id:body.followUp?.userId
    }
  },
  followUpDate:body.followUp?.followUpdate,
  isNonSevaKendraFollowUpRequired:body.isNonSevaKendraFollowUpRequired,
  isCompleted:body.isCompleted,
  sevakendra:undefined,
  updatedBy:{
    connect:{
      id:updatedById
    }
  }
}
return UpdateServiceMappingWithSevaKendraFollowUpDBObject;
}

export {
  createPostDonorObject,
  createupdateServiceMappingCompletionDBObject,
  createUpdateServiceMappingStoppedDBObject,
  createUpdateServiceMappingWithNonSevaKendraFollowUpDBObject,
  createUpdateServiceMappingWithSevaKendraFollowUpDBObject
};

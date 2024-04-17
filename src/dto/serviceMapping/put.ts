import { Prisma, StatusEnum } from "@prisma/client";
// import {
//   donorSchemaType,
//   putServiceMappingSchemaType,
//   serviceMappingUpdateType,
// } from "../../types/serviceMapping/serviceMappingSchema.js";

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

function createupdateServiceMappingPendingDBObject(
  body: putServiceMappingSchemaType,
  updatedById: string
) {
  const updateServiceMappingPendingDBObject = {
    userId:body.followUp?.userId,
    isFollowUpRequired:body.isFollowUpRequired,
    isNonSevaKendraFollowUpRequired :body.isNonSevaKendraFollowUpRequired,
    //reasonForNonCompletion:body.reasonForNonCompletion,
    isCompleted:StatusEnum.COMPLETED,

  updatedBy: {
    connect: {
      id: updatedById
    }
  }
  };
return updateServiceMappingPendingDBObject;
}

function createUpdateServiceMappingWithFollowUpDBObject(body,updatedById){
    const UpdateServiceMappingWithFollowUpDBObject={
        isCompleted:StatusEnum.PENDING,
        
    }

}

export {
  createPostDonorObject,
  createupdateServiceMappingCompletionDBObject,
  createupdateServiceMappingPendingDBObject,
};

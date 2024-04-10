import { AuditLogStatusEnum, Designation, FeaturesOnDesignations, StatusEnum } from "@prisma/client";
import { randomUUID } from "crypto";
import {
  postDesignationRequestSchemaType,
  postFeaturesOnDesignationsType,
  updateDesignationRequestSchemaType,
} from "../../types/designation/designationSchema.js";

const createPostDesignationDBObject = (
  request: postDesignationRequestSchemaType,
  createdById:string=""
) => {
  const createDesignationDBObject = {
    name: request.designation,
    sevaKendra: {
      connect: { id: request.sevaKendraId },
    },
    createdBy:{
      connect:{
        id:createdById
      }
    },
    updatedBy:{
      connect:{
        id:createdById
      }
    }
  };
  return createDesignationDBObject;
};

const createPostFeaturesOnDesignationsDBObject = (
  designationId: string | undefined,
  featureId: string,
 
) => {
  const featuresOnDesignationsDBObject: postFeaturesOnDesignationsType = {
    designation: {
      connect: {
        id: designationId,
      },
    },
    feature: {
      connect: {
        id: featureId,
      },
    },
  
  
  };

  return featuresOnDesignationsDBObject;
};
 function createUpdateDesignationObject(
  body: updateDesignationRequestSchemaType,
  id: string
) {
  const UpdateDesignationObject = {
    name:body.designation,
    sevaKendra:{
      connect:{
        id:body.sevaKendraId,
        district:{
          id:body.districtId,
          state:{
            id:body.stateId
          }
        }
      }
    },
 
  }
  return UpdateDesignationObject;
}

function createDesignationAuditLog(designationId:string="",){
const designationAuditLog ={
 designation:{
  connect:{
    id:designationId
  }
 },
 status:AuditLogStatusEnum.ACTIVE,
 date:new Date().toISOString(),
 description:"NEW DESIGNATION CREATED"
}
return designationAuditLog;
}

export {
  createPostDesignationDBObject,
  createPostFeaturesOnDesignationsDBObject,
  createUpdateDesignationObject,
  createDesignationAuditLog
};

import { Designation, FeaturesOnDesignations } from "@prisma/client";
import { randomUUID } from "crypto";
import {
  postDesignationRequestSchemaType,
  postFeaturesOnDesignationsType,
  updateDesignationRequestSchemaType,
} from "../../types/designation/designationSchema.js";

const createPostDesignationDBObject = (
  request: postDesignationRequestSchemaType
) => {
  const createDesignationDBObject = {
    name: request.designation,
    sevaKendra: {
      connect: { id: request.sevaKendraId },
    },
  };
  return createDesignationDBObject;
};

const createPostFeaturesOnDesignationsDBObject = (
  designationId: string | undefined,
  featureId: string,
  assignedById: string
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
    assignedBy: {
      connect: {
        id: assignedById,
      },
    },
    assignedOn: new Date(),
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
export {
  createPostDesignationDBObject,
  createPostFeaturesOnDesignationsDBObject,
  createUpdateDesignationObject,
};

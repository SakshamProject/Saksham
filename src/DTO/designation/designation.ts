import {
  AuditLogStatusEnum,
  Designation,
  FeaturesOnDesignations,
  StatusEnum,
} from "@prisma/client";
import { randomUUID } from "crypto";
import {
  postDesignationRequestSchemaType,
  postFeaturesOnDesignationsType,
  updateDesignationRequestSchemaType,
} from "../../types/designation/designationSchema.js";
import { auditLogDefaults } from "../../defaults.js";

const createPostDesignationDBObject = (
  request: postDesignationRequestSchemaType,
  createdById: string = ""
) => {
  const createDesignationDBObject = {
    name: request.designation,
    sevaKendra: {
      connect: { id: request.sevaKendraId },
    },
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
  return createDesignationDBObject;
};

const createPostFeaturesOnDesignationsDBObject = (
  designationId: string | undefined,
  featureId: string
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
  updatedById: string = ""
) {
  const UpdateDesignationObject = {
    name: body.designation,
    sevaKendra: {
      connect: {
        id: body.sevaKendraId,
        district: {
          id: body.districtId,
          state: {
            id: body.stateId,
          },
        },
      },
    },
    updatedBy: {
      connect: {
        id: updatedById,
      },
    },
  };
  return UpdateDesignationObject;
}

function createDesignationAuditLog(
  designationId: string = "",
  status:AuditLogStatusEnum= auditLogDefaults.status,
  date = auditLogDefaults.date,
  description: string = auditLogDefaults.description
) {
  const designationAuditLog = {
    designation: {
      connect: {
        id: designationId,
      },
    },
    status: status,
    date: date,
    description: description,
  };
  return designationAuditLog;
}

export {
  createPostDesignationDBObject,
  createPostFeaturesOnDesignationsDBObject,
  createUpdateDesignationObject,
  createDesignationAuditLog,
};

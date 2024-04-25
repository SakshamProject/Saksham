import { AuditLogStatusEnum } from "@prisma/client";
import {
  DesignationWhere,
  designationFilterType,
  postDesignationRequestSchemaType,
  postFeaturesOnDesignationsType,
  updateDesignationRequestSchemaType,
} from "../../types/designation/designationSchema.js";
import { auditLogDefaults } from "../../defaults.js";
import { designationFilterMapper } from "../../services/database/utils/designation/designation.js";

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
  status: AuditLogStatusEnum = auditLogDefaults.status,
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

const generateDesignationFilter = (
  filter: designationFilterType | undefined,
  SearchConditions: DesignationWhere | null
) => {
  const designationWhereInput: any = {
    AND: [],
  };
  if (filter) {
    for (const { operation, value, field } of filter) {
      designationWhereInput.AND.push(
        designationFilterMapper(field, operation, value)
      );
    }
  }
  if (SearchConditions != null)
    designationWhereInput.AND.push(SearchConditions);
  return designationWhereInput;
};

function createDesignationFilterInputObject(
  filter: designationFilterType | undefined,
  searchCondition: DesignationWhere | null
) {
  const designationWhereInput: any = {
    AND: [],
  };
  if (filter) {
    for (const { operation, value, field } of filter) {
      designationWhereInput.AND.push(
        designationFilterMapper(field, operation, value)
      );
    }
  }
  if (searchCondition != null) designationWhereInput.AND.push(searchCondition);
  return designationWhereInput;
}

export {
  createPostDesignationDBObject,
  createPostFeaturesOnDesignationsDBObject,
  createUpdateDesignationObject,
  createDesignationAuditLog,
  createDesignationFilterInputObject,
  generateDesignationFilter,
};

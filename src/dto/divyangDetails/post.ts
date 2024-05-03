import { generateDivyangDetailsFilter } from "../../services/database/utils/divyangDetails/filterMapper.js";
import { DivyangDetailsAuditLogDefaults } from "../../types/divyangDetails/divyangDetailsDefaults.js";
import {
  createDivyangDetails,
  DivyangDetailsFilterType,
  DivyangDetailsWhere,
  postDivyangDetailsRequest,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import { DivyangSignUp } from "../../types/divyangDetails/divyangSignUpRequestSchema.js";
import config from "../../../config.js";
import defaults from "../../defaults.js";
import * as crypto from "crypto";

const createDivyangDetailsDBObject = (
  divyangDetails: postDivyangDetailsRequest,
  createdBy: string = defaults.createdById
): createDivyangDetails => {
  const newDivyangDetails: createDivyangDetails = {
    divyangId: divyangDetails.personalDetails.divyangId,
    firstName: divyangDetails.personalDetails.firstName,
    lastName: divyangDetails.personalDetails.lastName,
    picture: divyangDetails.personalDetails.picture,
    bloodGroup: divyangDetails.personalDetails.bloodGroup,
    gender: divyangDetails.personalDetails.gender,
    dateOfBirth: divyangDetails.personalDetails.dateOfBirth,
    age: divyangDetails.personalDetails.age,
    mailId: divyangDetails.personalDetails.mailId,
    mobileNumber: divyangDetails.personalDetails.mobileNumber,
    fatherName: divyangDetails.personalDetails.fatherName,
    motherName: divyangDetails.personalDetails.motherName,
    udidCardNumber: divyangDetails.personalDetails.UDIDCardNumber,
    isMarried: divyangDetails.personalDetails.isMarried,
    spouseName: divyangDetails.personalDetails.spouseName,
    spouseNumber: divyangDetails.personalDetails.spouseNumber,
    religion: divyangDetails.personalDetails.religion,
    communityCategory: {
      connect: {
        id: divyangDetails.personalDetails.communityCategoryId,
      },
    },
    educationQualifications: {
      createMany: {
        data: divyangDetails.personalDetails.educationQualifications,
      },
    },
    community: divyangDetails.personalDetails.community,
    extraCurricularActivity:
      divyangDetails.personalDetails.extraCurricularActivity,
    createdBy: {
      connect: {
        id: createdBy,
      },
    },
    updatedBy: {
      connect: {
        id: createdBy,
      },
    },
    auditLog: {
      create: {
        date: DivyangDetailsAuditLogDefaults.date,
        status: DivyangDetailsAuditLogDefaults.status,
        description: DivyangDetailsAuditLogDefaults.description, // description value might change
      },
    },
    person: {
      create: {
        userName: divyangDetails.personalDetails.userName,
        password: {
          create: {
            password: crypto
              .createHmac(defaults.hashingAlgorithm, config.SECRET)
              .update(divyangDetails.personalDetails.password)
              .digest("hex"),
          },
        },
      },
    },
  };
  return newDivyangDetails;
};

const createDivyangDBObject = (
  divyangDetails: DivyangSignUp
): createDivyangDetails => {
  const id = crypto.randomUUID();
  const newDivyangDetails: createDivyangDetails = {
    id: id,
    divyangId: divyangDetails.divyangId,
    firstName: divyangDetails.firstName,
    lastName: divyangDetails.lastName,
    // picture: divyangDetails.picture,
    gender: divyangDetails.gender,
    dateOfBirth: divyangDetails.dateOfBirth,
    age: divyangDetails.age,
    mailId: divyangDetails.mailId,
    mobileNumber: divyangDetails.mobileNumber,
    aadharCardNumber: divyangDetails.aadharCardNumber,
    udidCardNumber: divyangDetails.UDIDCardNumber,
    auditLog: {
      create: {
        date: DivyangDetailsAuditLogDefaults.date,
        status: DivyangDetailsAuditLogDefaults.status,
        description: DivyangDetailsAuditLogDefaults.description, // description value might change
      },
    },
    person: {
      create: {
        userName: divyangDetails.userName,
        password: {
          create: {
            password: crypto
              .createHmac(defaults.hashingAlgorithm, config.SECRET)
              .update(divyangDetails.password)
              .digest("hex"),
          },
        },
      },
    },
  };
  return newDivyangDetails;
};

const createDivyangDetailsFilterInputObject = (
  divyangDetailsFilter: DivyangDetailsFilterType | undefined,
  globalSearchConditions: DivyangDetailsWhere | null
): DivyangDetailsWhere => {
  const divyangDetailsWhereInput = generateDivyangDetailsFilter(
    divyangDetailsFilter,
    globalSearchConditions
  );
  return divyangDetailsWhereInput;
};
export {
  createDivyangDetailsDBObject,
  createDivyangDetailsFilterInputObject,
  createDivyangDBObject,
};

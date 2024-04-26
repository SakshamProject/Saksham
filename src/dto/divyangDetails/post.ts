import { Prisma } from "@prisma/client";
import { generateDivyangDetailsFilter } from "../../services/database/utils/divyangDetails/filterMapper.js";
import { DisabilityOfDivyang } from "../../types/divyangDetails/disabilityDetailsSchema.js";
import { DivyangDetailsAuditLogDefaults } from "../../types/divyangDetails/divyangDetailsDefaults.js";
import {
  createDivyangDetails,
  DivyangDetailsFilterType,
  DivyangDetailsWhere,
  postDivyangDetailsRequest,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import defaults from "../../defaults.js";

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
    isMarried: divyangDetails.personalDetails.isMarried,
    spouseName: divyangDetails.personalDetails.spouseName,
    spouseNumber: divyangDetails.personalDetails.spouseNumber,
    religion: divyangDetails.personalDetails.religion,
    communityCategory: {
      connect: {
        id: divyangDetails.personalDetails.communityCategoryId,
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
        loginId: divyangDetails.personalDetails.divyangId,
        password: {
          create: {
            password: divyangDetails.personalDetails.password,
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
export { createDivyangDetailsDBObject, createDivyangDetailsFilterInputObject };

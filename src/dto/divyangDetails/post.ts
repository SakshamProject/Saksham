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
import { DivyangSignUp } from "../../types/divyangDetails/personalDetailsSchema.js";
import config from "../../../config.js";
import defaults from "../../defaults.js";
import * as crypto from "crypto";
const createDivyangDetailsDBObject = (
  divyangDetails: DivyangSignUp,
  createdBy: string
): createDivyangDetails => {
  const newDivyangDetails: createDivyangDetails = {
    divyangId: divyangDetails.divyangId,
    firstName: divyangDetails.firstName,
    lastName: divyangDetails.lastName,
    picture: divyangDetails.picture,
    gender: divyangDetails.gender,
    dateOfBirth: divyangDetails.dateOfBirth,
    age: divyangDetails.age,
    mailId: divyangDetails.mailId,
    mobileNumber: divyangDetails.mobileNumber,
    // createdBy: {
    //   connect: {
    //     id: createdBy,
    //   },
    // },
    // updatedBy: {
    //   connect: {
    //     id: createdBy,
    //   },
    // },
    auditLog: {
      create: {
        date: DivyangDetailsAuditLogDefaults.date,
        status: DivyangDetailsAuditLogDefaults.status,
        description: DivyangDetailsAuditLogDefaults.description, // description value might change
      },
    },
    person: {
      create: {
        loginId: divyangDetails.username,
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
export { createDivyangDetailsDBObject, createDivyangDetailsFilterInputObject };

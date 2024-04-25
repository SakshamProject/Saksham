import { Prisma } from "@prisma/client";
import * as crypto from "crypto";
import { Request } from "express";
import {
  userListType,
  userPutRequestType,
} from "../../types/users/usersSchema.js";
import generateUserListWhereInput from "../../services/database/utils/users/usersFilterMapper.js";
import config from "../../../config.js";
import defaults from "../../defaults.js";

function createUserDBObject(request: Request): Prisma.PersonCreateInput {
  const userInputObject: Prisma.PersonCreateInput = {
    loginId: request.body.loginId,
    password: {
      create: {
        password: crypto
          .createHmac(defaults.hashingAlgorithm, config.SECRET)
          .update(request.body.password)
          .digest("hex"),
      },
    },
    user: {
      create: {
        userId: request.body.userId,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        gender: request.body.gender,
        dateOfBirth: request.body.dateOfBirth,
        contactNumber: request.body.contactNumber,
        whatsappNumber: request.body.whatsappNumber,
        email: request.body.email,
        createdBy: {
          connect: {
            id: request.user.id,
          },
        },
        designation: {
          connect: {
            id: request.body.designationId,
          },
        },
        userAuditLog: {
          create: {
            description: request.body.description,
            status: request.body.status,
            date: request.body.effectiveDate,
          },
        },
      },
    },
  };

  return userInputObject;
}

function listUserWhereInput(body: userListType): Prisma.UserWhereInput {
  const userWhereInput = generateUserListWhereInput(body);
  return userWhereInput;
}
function createAuditLogDBObject(body: userPutRequestType, id: string) {
  if (body.auditlog) {
    const Auditlog: Prisma.UserAuditLogCreateInput = {
      description: body.auditlog?.description,
      status: body.auditlog?.status,
      date: body.auditlog?.date,
      user: {
        connect: {
          id: id,
        },
      },
    };
    return Auditlog;
  }
}

export { createUserDBObject, listUserWhereInput, createAuditLogDBObject };

import { NextFunction, Request, Response } from "express";
import {
  createResponseOnlyData,
  createResponseWithFile,
} from "../../types/createResponseSchema.js";
import {
  getUserByIdDB,
  getUserStatusDB,
} from "../../services/database/users/read.js";
import { getUsersBySevaKendraIdDBTransaction } from "../../services/database/users/transaction/read.js";
import { AuditLogStatusEnum } from "@prisma/client";
import { auditLogStatusEnumSchema } from "../../types/inputFieldSchema.js";
import prisma from "../../services/database/database.js";
import { getUserFiles } from "../../services/files/get.js";

async function getUserById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const userId: string = request.params.userId;
    let result = await getUserByIdDB(userId);
    const currentDate = new Date(Date.now()).toISOString();
    const auditLog = await getUserStatusDB(prisma, userId, currentDate);
    const files = await getUserFiles(result);
    const responseData = createResponseWithFile(
      {
        ...result,
        status: auditLog?.status,
        description: auditLog?.description,
        effectiveFromDate: auditLog?.date,
        timestamp: currentDate,
      },
      files
    );
    response.send(responseData);
    // // File
    // // Profile Photo
    // let file = {};
    // if (result?.profilePhotoFile) {
    //     file = {
    //         "profilePhoto": await generateFileURLResponseFromKey(result.profilePhotoFile)
    //     }
    // }
    // log("info", "[getUserById]: %o", file);
    // responseData = {
    //     ...responseData,
    //     file: file
    // }

    // response.json(responseData);
  } catch (error) {
    next(error);
  }
}

async function getUsersBySevaKendra(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const sevaKendraId: string = request.params.id;
    const status: AuditLogStatusEnum | undefined =
      auditLogStatusEnumSchema.parse(request.query.status);
    const result = await getUsersBySevaKendraIdDBTransaction(
      sevaKendraId,
      status
    );
    let filteresUsers;
    if (status) {
      filteresUsers = result?.allPerson?.filter(
        (person) => person.user?.auditLog[0].status === status
      );
    } else {
      filteresUsers = result?.allPerson;
    }

    response.json(createResponseOnlyData(filteresUsers));
  } catch (error) {
    next(error);
  }
}

export { getUserById, getUsersBySevaKendra };

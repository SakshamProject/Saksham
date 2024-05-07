import {Prisma} from "@prisma/client";
import {Request} from "express";
import {userListType, userPutRequestType,} from "../../types/users/usersSchema.js";
import generateUserListWhereInput from "../../services/database/utils/users/usersFilterMapper.js";
import {createHmac} from "node:crypto";
import defaults from "../../defaults.js";
import config from "../../../config.js";
import log from "../../services/logger/logger.js";

function hashPassword(password: string): string {
    const hashedPassword = createHmac(defaults.hashingAlgorithm, config.SECRET)
        .update(password)
        .digest("hex");
    log("info", "[hashPassword]: %s", password);
    return hashedPassword;
}

function createPersonDBObject(request: Request): Prisma.PersonCreateInput {
    const userInputObject: Prisma.PersonCreateInput = {
        userName: request.body.userName,
        password: {
            create: {
                password: hashPassword(request.body.password)
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
                        id: request.token?.userId,
                    }
                },
                designation: {
                    connect: {
                        id: request.body.designationId,
                    },
                },
                updatedBy: {
                    connect: {
                        id: request.token?.userId,
                    },
                },
                auditLog: {
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

export {createPersonDBObject, listUserWhereInput, createAuditLogDBObject, hashPassword};

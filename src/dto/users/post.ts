import {Prisma} from "@prisma/client";
import {Request} from "express";
import {userListType, userPostRequestType, userPutRequestType,} from "../../types/users/usersSchema.js";
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

function createPersonDBObject(body: userPostRequestType, createdBy: string = defaults.createdById, updatedBy: string = defaults.updatedById): Prisma.PersonCreateInput {
    const userInputObject: Prisma.PersonCreateInput = {
        userName: body.userName,
        password: {
            create: {
                password: hashPassword(body.password)
            },
        },
        user: {
            create: {
                userId: body.userId,
                firstName: body.firstName,
                lastName: body.lastName,
                gender: body.gender,
                dateOfBirth: body.dateOfBirth,
                contactNumber: body.contactNumber,
                whatsappNumber: body.whatsappNumber,
                email: body.email,
                createdBy: {
                    connect: {
                        id: createdBy
                    }
                },
                designation: {
                    connect: {
                        id: body.designationId,
                    },
                },
                updatedBy: {
                    connect: {
                        id: updatedBy
                    },
                },
                auditLog: {
                    create: {
                        description: body.description,
                        status: body.status,
                        date: body.effectiveDate,
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

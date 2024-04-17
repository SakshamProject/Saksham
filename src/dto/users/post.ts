import { Prisma } from "@prisma/client";
import { Request } from "express";
import {userListType} from "../../types/users/usersSchema.js";
import generateUserListWhereInput from "../../services/database/utils/users/usersFilterMapper.js";

function createUserDBObject(request: Request): Prisma.UserCreateInput {
    const userInputObject: Prisma.UserCreateInput = {
        person: {
            connect: {
                id: request.user.id,
            }
        },
        userId: request.body.userId,
        firstName: request.body.firstName,

        lastName: request.body.lastName,
        gender: request.body.gender,
        dateOfBirth: request.body.dateOfBirth,
        contactNumber: request.body.contactNumber,
        whatsappNumber: request.body.whatsappNumber,
        email: request.body.email,
        designation: {
            connect: {
                id: request.body.designationId
            }
        },
        userAuditLog: {
            create: {
                description: request.body.description,
                status: request.body.status,
                date: request.body.effectiveDate,
            }
        }
    }
    return userInputObject;
}
function updateUserDBObject(request: Request): Prisma.UserCreateInput {
    const userUpdateObject: Prisma.UserUpdateInput = {
        person: {
            connect: {
                id: request.user.id,
            }
        },
        userId: request.body.userId,
        firstName: request.body.firstName,

        lastName: request.body.lastName,
        gender: request.body.gender,
        dateOfBirth: request.body.dateOfBirth,
        contactNumber: request.body.contactNumber,
        whatsappNumber: request.body.whatsappNumber,
        email: request.body.email,
        designation: {
            connect: {
                id: request.body.designationId
            }
        },
        userAuditLog: {
            update: {
                description: request.body.description,
                status: request.body.status,
                date: request.body.effectiveDate,
            }
        }
    }
    return userUpdateObject;
}


function listUserWhereInput(body: userListType): Prisma.UserWhereInput {
    const userWhereInput = generateUserListWhereInput(body);
    return userWhereInput;
}

export { createUserDBObject, listUserWhereInput };
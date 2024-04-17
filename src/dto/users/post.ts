import { Prisma } from "@prisma/client";
import { Request } from "express";
import {userListType} from "../../types/users/usersSchema.js";
import generateUserListWhereInput from "../../services/database/utils/users/usersFilterMapper.js";

function createUserDBObject(request: Request): Prisma.PersonCreateInput {
    const userInputObject: Prisma.PersonCreateInput = {
        loginId: request.body.loginId,
        pasword: {
          create: {
              password: request.body.password // TODO: Hash this
          }
        },
        user: {
            create:{
                userId: request.body.userId,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                gender: request.body.gender,
                dateOfBirth: request.body.dateOfBirth,
                contactNumber: request.body.contactNumber,
                whatsappNumber: request.body.whatsappNumber,
                email: request.body.email,
                // createdBy: {
                //     connect: {
                //         userId: request.user.id,
                //     }
                // },
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
            }
        }

    return userInputObject;
}
function updateUserDBObject(request: Request): Prisma.UserUpdateInput {
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
        // userAuditLog: {
        //     update : {
        //         description: request.body.description,
        //         status: request.body.status,
        //         date: request.body.effectiveDate,
        //     }
        }
    return userUpdateObject;
}


function listUserWhereInput(body: userListType): Prisma.UserWhereInput {
    const userWhereInput = generateUserListWhereInput(body);
    return userWhereInput;
}

export { createUserDBObject, listUserWhereInput };
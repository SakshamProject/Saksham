import { Prisma } from "@prisma/client";
import { Request } from "express";
import {userListType, userPutRequestType} from "../../types/users/usersSchema.js";
import generateUserListWhereInput from "../../services/database/utils/users/usersFilterMapper.js";

function updateUserDBObject(body:userPutRequestType): Prisma.UserUpdateInput {
    const userUpdateObject: Prisma.UserUpdateInput = {
        userId: body.userId,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        contactNumber: body.contactNumber,
        whatsappNumber: body.whatsappNumber,
        email: body.mail,
        designation: {
            connect: {
                id: body.designationId
            }
        },
        // userAuditLog: {
        //     update : {
        //         description: body.description,
        //         status: body.status,
        //         date: body.effectiveDate,
        //     }
        }
    return userUpdateObject;
}
export {updateUserDBObject}
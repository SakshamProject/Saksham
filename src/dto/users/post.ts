import { Prisma } from "@prisma/client";
import { userPostRequestType } from "../../types/users/usersSchema.js";
import {createHmac} from "node:crypto";
import config from "../../../config.js";
import usersDefaults from "../../services/database/users/defaults/usersDefaults.js";

function createUserDBObject(body: userPostRequestType): Prisma.UserCreateInput {
    const userInputObject: Prisma.UserCreateInput = {
        userId: body.userId,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        currentStatus: usersDefaults.currentStatus,
        contactNumber: body.contactNumber,
        whatsappNumber: body.whatsappNumber,
        email: body.email,
        loginId: body.loginId,
        designation: {
            connect: {
                id: body.designationId
            }
        },
        password: {
            create: {
                hashedPassword: createHmac('sha256', config.secret).update('I love cupcakes').digest('hex')
            }
        },
        userAuditLog: {
            create: {
                description: body.description,
                status: body.status,
                date: body.effectiveDate,
            }
        }
    }
    return userInputObject;
}

export { createUserDBObject };
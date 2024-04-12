import { Prisma } from "@prisma/client";
import { userPostRequestType } from "../../types/users/usersSchema.js";

function createUserDBObject(body: userPostRequestType): Prisma.UserCreateInput {
    const userInputObject: Prisma.UserCreateInput = {
        userId: body.userId,
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
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
                hashedPassword: "abcd@123"
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
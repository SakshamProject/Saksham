import { Prisma } from "@prisma/client";
import { userPutRequestType } from "../../types/users/usersSchema.js";

function updateUserDBObject(
  body: userPutRequestType,
  updatedBy: string
): Prisma.UserUpdateInput {
  const userUpdateObject: Prisma.UserUpdateInput = {
    userId: body.userId,
    firstName: body.firstName,
    lastName: body.lastName,
    gender: body.gender,
    dateOfBirth: body.dateOfBirth,
    contactNumber: body.contactNumber,
    whatsappNumber: body.whatsappNumber,
    email: body.email,
    designation: {
      connect: {
        id: body.designationId,
      },
    },
    updatedBy: {
      connect: { id: updatedBy },
    },
    person: {
      update: {
        userName: body.userName,
      },
    },
  };
  return userUpdateObject;
}
export { updateUserDBObject };

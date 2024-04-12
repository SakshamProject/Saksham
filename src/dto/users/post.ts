import { Prisma } from "@prisma/client";
import { userPostRequestType } from "../../types/users/usersSchema.js";

function createUserDBObject(body: userPostRequestType): Prisma.UserUncheckedCreateInput {
    const userInputObject: Prisma.UserCreateInput = {
    }
    return userInputObject;
}
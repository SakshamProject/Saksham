import {Prisma} from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import log from "../../logger/logger.js";
import prisma from "../database.js";

async function updateUserDB(userUpdateObject: Prisma.PersonUpdateInput,) {
    try {
        const newUser = await prisma.person.update({
            where: {
                id:
            },
            data: userUpdateObject});
        log("info", "[database/createUserDB]: newUser: %o", newUser);
        return newUser;
    } catch (error) {
        if (error instanceof Error) {
            log("error", "[database/createUserDB]: %o", error);
            throwDatabaseError(error);
        }
    }
}

export {updateUserDB};
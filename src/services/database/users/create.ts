import {Prisma} from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import log from "../../logger/logger.js";
import prisma from "../database.js";

async function createUserDB(userInputObject: Prisma.UserCreateInput) {
    try {
        const newUser = await prisma.user.create({data: userInputObject});
        log("info", "[database/createUserDB]: newUser: %o", newUser);
        return newUser;
    } catch (error) {
        if (error instanceof Error) {
            log("error", "[database/createUserDB]: %o", error);
            throwDatabaseError(error);
        }
    }
}

export {createUserDB};
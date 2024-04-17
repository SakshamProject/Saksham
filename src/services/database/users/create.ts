import {Prisma} from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import log from "../../logger/logger.js";
import prisma from "../database.js";

async function createUserDB(userInputObject: Prisma.PersonCreateInput) {
    try {
        const newUser = await prisma.person.create({
            include: {
                user: true,
            },
            data: userInputObject});
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
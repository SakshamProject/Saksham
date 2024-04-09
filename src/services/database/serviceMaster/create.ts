import {Prisma} from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function createServiceDB(query: Prisma.ServiceUncheckedCreateInput) {
    try {
        const service = await prisma.service.create({data: query});
        return service;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {createServiceDB};
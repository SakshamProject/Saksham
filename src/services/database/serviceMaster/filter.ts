import {Prisma} from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function filterServiceDB(serviceWhereInput: Prisma.ServiceWhereInput) {
    try {
        const query: Prisma.ServiceFindManyArgs = {
            where: serviceWhereInput,
        };
        const results = await prisma.service.findMany(query);
        return results;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {filterServiceDB};
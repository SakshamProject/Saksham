import {Prisma} from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import defaults from "../../../defaults.js";
import {serviceMasterColumnNameMapper} from "../utils/serviceMaster/serviceMasterColumnNameMapper.js";
import serviceMasterDefaults from "./defaults/defaults.js";

async function filterServiceDB( prismaTransaction: Prisma.TransactionClient,
                                orderBy = "createdAt",
                               sortOrder: "asc" | "desc" = defaults.sortOrder,
                               skip = defaults.skip,
                               take = defaults.take,
                               serviceWhereInput: Prisma.ServiceWhereInput) {
    try {
        const query: Prisma.ServiceFindManyArgs = {
            select: serviceMasterDefaults.select,
            where: serviceWhereInput,
            skip: skip,
            take: take,
            orderBy: serviceMasterColumnNameMapper(orderBy, sortOrder),
        };
        const results = await prismaTransaction.service.findMany(query);
        return results;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

async function filterServiceTotalDB(prismaTransaction: Prisma.TransactionClient, serviceWhereInput: Prisma.ServiceWhereInput) {
    try {
        const count = await prismaTransaction.service.count({
            where: serviceWhereInput,
        });
        return count;
    }
    catch(error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {filterServiceDB, filterServiceTotalDB};
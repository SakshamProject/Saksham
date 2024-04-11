import defaults from "../../../../defaults.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import {filterServiceDB, filterServiceTotalDB} from "../filter.js";
import {sortOrderEnum} from "../../../../types/getRequestSchema.js";
import serviceMasterDefaults from "../defaults/defaults.js";

async function getFilterServicesDBTransaction(start = defaults.skip, rows = defaults.take, orderBy = serviceMasterDefaults.orderBy, sortOrder: sortOrderEnum = defaults.sortOrder, serviceWhereInput: Prisma.ServiceTypeWhereInput) {
    const transaction = await prisma.$transaction(
        async (prismaTransaction) => {
            try {
                const services =
                    await filterServiceDB(prismaTransaction, orderBy, sortOrder, start, rows, serviceWhereInput);
                const total = await filterServiceTotalDB(prismaTransaction, serviceWhereInput);
                return { services, total };
            }
            catch (error) {
                if (error instanceof Error) {
                    throwDatabaseError(error);
                }
            }
        },
        defaults.transactionOptions
    );
    return transaction;
}

export { getFilterServicesDBTransaction };

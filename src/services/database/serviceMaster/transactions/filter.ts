import defaults from "../../../../defaults.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import {filterServiceDB, filterServiceTotalDB} from "../filter.js";

async function getFilterServicesDBTransaction(start = defaults.skip, rows = defaults.take, orderBy = "serviceName", sortOrder: "asc" | "desc" = defaults.sortOrder, serviceWhereInput: Prisma.ServiceWhereInput) {
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
        {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
            maxWait: 50000,
            timeout: 10000,
        }
    );
    return transaction;
}

export { getFilterServicesDBTransaction };
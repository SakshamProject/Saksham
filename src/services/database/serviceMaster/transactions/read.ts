import defaults from "../../../../defaults.js";
import prisma from "../../database.js";
import {getServicesDB, getServiceTotalDBTransaction} from "../read.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import {Prisma} from "@prisma/client";

async function getServiceDBTransaction(start = defaults.skip, rows = defaults.take, orderBy = "serviceName", sortOrder: "asc" | "desc" = defaults.sortOrder, searchText = "") {
    const transaction = await prisma.$transaction(
        async (prismaTransaction) => {
            try {
                const services =
                    await getServicesDB(prismaTransaction, orderBy, sortOrder, start, rows, searchText);
                const total = await getServiceTotalDBTransaction(prismaTransaction, searchText);
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

export { getServiceDBTransaction }
import defaults from "../../../../defaults.js";
import {Prisma} from "@prisma/client";
import throwDatabaseError from "../../utils/errorHandler.js";
import {getServicesDB, getServiceTotalDB} from "../read.js";
import prisma from "../../database.js";
import serviceMasterDefaults from "../defaults/defaults.js";
import {sortOrderEnum} from "../../../../types/getRequestSchema.js";

async function getServicesDBTransaction(start = defaults.skip, rows = defaults.take, orderBy = serviceMasterDefaults.orderBy, sortOrder: sortOrderEnum = defaults.sortOrder, searchText = "") {
    const transaction = prisma.$transaction(
        async (prismaTransaction: Prisma.TransactionClient) => {
            try {
                const services =
                    await getServicesDB(prismaTransaction, orderBy, sortOrder, start, rows, searchText);
                const total = await getServiceTotalDB(prismaTransaction, searchText);
                return {services, total};
            } catch (error) {
                if (error instanceof Error) {
                    throwDatabaseError(error);
                }
            }
        }, defaults.transactionOptions
    );
    return transaction;
}

export {getServicesDBTransaction};
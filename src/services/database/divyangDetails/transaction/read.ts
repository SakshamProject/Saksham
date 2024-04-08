import { Prisma } from "@prisma/client";
import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { getDivyangDetailsDB, getDivyangDetailsTotal } from "../read.js";

const getDivyangDetailsDBTransaction = async (
    start: number = defaults.skip,
    rows: number = defaults.take,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    searchText: string | undefined
) => {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
        try{
            const divyangDetails = await getDivyangDetailsDB(
                prismaTransaction,
                sortOrder,
                searchText
            )

            const total = await getDivyangDetailsTotal(prismaTransaction, searchText)
            return { divyangDetails, total }

        } catch (error) {
            if (error instanceof Error) {
                throwDatabaseError(error)
            }
        }
    },
    {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 10000,
    }
    )
    return transaction
}

export { getDivyangDetailsDBTransaction }
import { DivyangDetails, Prisma } from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import prisma from "../database.js";

const createDivyangDetailsDB = async (divyangDetails: Prisma.DivyangDetailsUncheckedCreateInput): Promise<DivyangDetails | undefined> => {
    try {
        const createdDivyangDetails = await prisma.divyangDetails.create({
            data: divyangDetails
        })

        return createdDivyangDetails


    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { createDivyangDetailsDB }
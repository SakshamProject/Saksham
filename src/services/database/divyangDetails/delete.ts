import { DivyangDetails } from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const deleteDivyangDetailsDB = async (id: string): Promise<DivyangDetails | undefined> => {
    try {
        const deletedDivyangDetails: DivyangDetails = await prisma.divyangDetails.delete({
            where: {
                id: id
            }
        })
        return deletedDivyangDetails
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { deleteDivyangDetailsDB }
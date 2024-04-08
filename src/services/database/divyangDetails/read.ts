import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getDivyangDetailsDB = async (
    prismaTransaction: any,
    sortOrder: sortOrderEnum | undefined = defaults.sortOrder,
    searchText: string = "",
) => {
    try {
        const divyangsDetails = await prismaTransaction.divyangDetails.findMany({
            orderBy: {
                name: sortOrder,
            },
            where: {
                name: {
                    contains: searchText,
                    mode: "insensitive"
                }
            }
        });

        return divyangsDetails;

    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

const getDivyangDetailsByIdDB = async (id: string) => {
    try {
        const divyangDetails = await prisma.divyangDetails.findFirstOrThrow({
            where: {
                id: id,
            },
        });
        return divyangDetails
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

async function getDivyangDetailsTotal(prismaTransaction: any, searchText: string | undefined) {
    try {
        const divyangDetails: number = await prismaTransaction.DivyangDetails.count({
            where: {
                name: { contains: searchText, mode: "insensitive" },
            },
        })
        return divyangDetails;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { getDivyangDetailsDB, getDivyangDetailsTotal, getDivyangDetailsByIdDB }
import defaults from "../../../defaults.js";
import {sortOrderEnum} from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import usersDefaults from "./defaults/usersDefaults.js";

async function getUserDB(
    prismaTransaction: Prisma.TransactionClient,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    orderBy: string,
    userWhereInput: Prisma.UserWhereInput
) {
    try {
        const results = await prismaTransaction.user.findMany({
            select: usersDefaults.select,
            orderBy: {
                firstName: sortOrder,
            },
            where: userWhereInput
        });
        return results;
    } catch (err) {
        if (err instanceof Error) {
            throwDatabaseError(err);
        }
    }
}

async function getUserTotal(
    prismaTransaction: Prisma.TransactionClient,
    userWhereInput: Prisma.UserWhereInput
) {
    try {
        const userTotal: number =
            await prismaTransaction.user.count({
                where: userWhereInput
            });
        return userTotal;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

const getUserByIdDB = async (id: string) => {
    try {
        const person = await prisma.person.findFirstOrThrow({
            // select: usersDefaults.select,
            include: usersDefaults.includeAll,
            where: {
                id: id,
            },
        });
        return person;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
};

export {getUserDB, getUserTotal, getUserByIdDB}
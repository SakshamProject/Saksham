import defaults from "../../../defaults.js";
import {sortOrderEnum} from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {AuditLogStatusEnum, Prisma} from "@prisma/client";
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
const getUserStatusDB = async (
    prismaTransaction: Prisma.TransactionClient,
    userId: string,
    currentDate: string
) => {
    try {
        const UserAuditLog = await prismaTransaction.userAuditLog.findFirstOrThrow(
            {
                where: {
                    AND: [
                        {userId: userId},
                        {
                            date: {
                                lte: currentDate,
                            },
                        },
                    ],
                },
                orderBy: {
                    date: "desc",
                },
                take: 1,
            }
        );
        return UserAuditLog;
    } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
    }
};

async function getUsersBySevaKendraIdDB(prismaTransaction: Prisma.TransactionClient, sevaKendraId: string, status: AuditLogStatusEnum | undefined) {
    try {
        const currentDate = new Date(Date.now()).toISOString();
        const users = prismaTransaction.person.findMany({
            select: {
                id: true,
                loginId: true,
                user: {
                    select: {
                        id: true,
                        userAuditLog: {
                            select: {
                                status: true,
                            },
                            where: {
                                date: {
                                    lt: currentDate
                                }
                            },
                            orderBy: {
                                date: "desc",
                            },
                            take: 1,
                        }
                    }
                }
            },
            where: {
                AND: [
                    {
                        user: {
                            designation: {
                                sevaKendra: {
                                    id: sevaKendraId,
                                }
                            }
                        }
                    },
                    {
                        user: {
                            userAuditLog: {
                                every: {
                                    status: status
                                }
                            }
                        }
                    }
                ]
            }
        });
        return users;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

async function getUsersBySevaKendraIdTotalDB(prismaTransaction: Prisma.TransactionClient, sevaKendraId: string, status: AuditLogStatusEnum | undefined) {
    try {
        const total = await prismaTransaction.person.count({
            where: {
                AND: [
                    {
                        user: {
                            designation: {
                                sevaKendra: {
                                    id: sevaKendraId,
                                }
                            }
                        }
                    },
                    {
                        user: {
                            userAuditLog: {
                                every: {
                                    status: status
                                }
                            }
                        }
                    }
                ]
            }
        });
        return total;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {
    getUserDB,
    getUserTotal,
    getUserByIdDB,
    getUserStatusDB,
    getUsersBySevaKendraIdDB,
    getUsersBySevaKendraIdTotalDB
}
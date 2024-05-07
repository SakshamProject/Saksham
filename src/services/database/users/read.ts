import defaults from "../../../defaults.js";
import {sortOrderEnum} from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma, StatusEnum} from "@prisma/client";
import usersDefaults from "./defaults/usersDefaults.js";
import usersOrderByColumnMapper from "../utils/users/usersColumnNameMapper.js";

async function getUserDB(
    prismaTransaction: Prisma.TransactionClient,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    orderBy: string,
    userWhereInput: Prisma.UserWhereInput
) {
    try {
        const results = await prismaTransaction.user.findMany({
            select: usersDefaults.select,
            orderBy: usersOrderByColumnMapper(orderBy, sortOrder),
            where: userWhereInput,
        });
        return results;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

async function getUserTotal(
    prismaTransaction: Prisma.TransactionClient,
    userWhereInput: Prisma.UserWhereInput
) {
    try {
        const userTotal: number = await prismaTransaction.user.count({
            where: userWhereInput,
        });
        return userTotal;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

const getUserByPersonIdDB = async (personId: string) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            include: {
                auditLog: true,
                createdBy: true,
                updatedBy: true,
                designation: {
                    select: {
                        id: true,
                        name: true,
                        sevaKendra: {
                            select: {
                                id: true,
                                name: true,
                                district: {
                                    select: {
                                        id: true,
                                        name: true,
                                        state: {
                                            select: {
                                                id: true,
                                                name: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                person: {
                    select: {
                        id: true,
                        userName: true,
                    },
                },
            },
            where: {
                personId: personId,
            },
        });
        return user;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
};

const getUserByIdDB = async (id: string) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            // select: usersDefaults.select,
            include: {
                auditLog: true,
                createdBy: true,
                updatedBy: true,
                person: {
                    select: {
                        userName: true,
                    },
                },
                designation: {
                    select: {
                        id: true,
                        name: true,
                        sevaKendra: {
                            select: {
                                id: true,
                                name: true,
                                district: {
                                    select: {
                                        id: true,
                                        name: true,
                                        state: {
                                            select: {
                                                id: true,
                                                name: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                id: id,
            },
        });
        return user;
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
        const UserAuditLog = await prismaTransaction.userAuditLog.findFirstOrThrow({
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
        });
        return UserAuditLog;
    } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
    }
};


async function getUsersBySevaKendraIdDB(
    prismaTransaction: Prisma.TransactionClient,
    sevaKendraId: string) {
    try {


        const currentDate = new Date(Date.now()).toISOString();
        const allPerson = await prismaTransaction.person.findMany({
            select: {
                id: true,
                userName: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        auditLog: {
                            select: {
                                status: true,
                            },
                            where: {
                                date: {
                                    lt: currentDate,
                                },
                            },
                            orderBy: {
                                date: "desc",
                            },
                            take: 1,
                        },
                    },
                },
            },
            orderBy: [
                {
                    user: {
                        firstName: "asc",
                    },
                },
                {
                    user: {
                        lastName: "asc",
                    },
                },
            ],
            where: {
                AND: [
                    {
                        user: {
                            designation: {
                                sevaKendra: {
                                    id: sevaKendraId,
                                },
                            },
                        },
                    },

                ],
            },
        });
        return allPerson;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}


async function getUserDependencyStatusDB(prismaTransaction: Prisma.TransactionClient, userId: string) {
    try {
        const user = await prismaTransaction.user.findUnique({
            where: {
                id: userId
            },
            include: {
                divyangServiceMapping: {
                    where: {
                        isCompleted: StatusEnum.PENDING
                    }
                },


            }
        });
        const dependencyStatus = !(user?.divyangServiceMapping.length === 0 || user?.divyangServiceMapping === null);
        return dependencyStatus;

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
    getUserDependencyStatusDB,
    getUserByPersonIdDB
};

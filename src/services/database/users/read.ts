import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
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

const getUserByIdDB = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      // select: usersDefaults.select,
      include: {
        userAuditLog: true,
        createdBy: true,
        updatedBy: true,
        person: {
          select: {
            loginId: true,
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
          { userId: userId },
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
  sevaKendraId: string,
  status: AuditLogStatusEnum | undefined
) {
  try {
    const currentDate = new Date(Date.now()).toISOString();
    const users = prismaTransaction.person.findMany({
      select: {
        id: true,
        loginId: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userAuditLog: {
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
          {
            user: {
              userAuditLog: {
                every: {
                  status: status,
                },
              },
            },
          },
        ],
      },
    });
    return users;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function getUsersBySevaKendraIdTotalDB(
  prismaTransaction: Prisma.TransactionClient,
  sevaKendraId: string,
  status: AuditLogStatusEnum | undefined
) {
  try {
    const total = await prismaTransaction.person.count({
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
          {
            user: {
              userAuditLog: {
                every: {
                  status: status,
                },
              },
            },
          },
        ],
      },
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
  getUsersBySevaKendraIdTotalDB,
};

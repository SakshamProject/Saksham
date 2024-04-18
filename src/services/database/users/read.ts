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
        const user = await prisma.user.findFirstOrThrow({
            // select: usersDefaults.select,
            include: usersDefaults.includeAll,
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
      const UserAuditLog = await prismaTransaction.userAuditLog.findFirstOrThrow(
        {
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
        }
      );
      return UserAuditLog;
    } catch (error) {
      if (error instanceof Error) throwDatabaseError(error);
    }
  };
export {getUserDB, getUserTotal, getUserByIdDB,getUserStatusDB}
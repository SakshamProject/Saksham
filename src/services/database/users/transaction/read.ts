import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { Prisma } from "@prisma/client";
import { AuditLogStatusEnum } from "@prisma/client";
import { getUserDB, getUsersBySevaKendraIdDB, getUserTotal } from "../read.js";
import usersDefaults from "../defaults/usersDefaults.js";
import { userOrderByEnum } from "../../../../types/users/usersSchema.js";

const getUsersDBTransaction = async (
  start: number = defaults.skip,
  rows: number = defaults.take,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  orderBy: userOrderByEnum = usersDefaults.orderBy,
  userWhereInput: Prisma.UserWhereInput
) => {
  try {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        try {
          const users = await getUserDB(
            prismaTransaction,
            sortOrder,
            orderBy,
            userWhereInput
          );
          const total = await getUserTotal(prismaTransaction, userWhereInput);
          return { users, total };
        } catch (error) {
          if (error instanceof Error) throwDatabaseError(error);
        }
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 10000,
      }
    );
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

async function getUsersBySevaKendraIdDBTransaction(
  sevaKendraId: string,
  status: AuditLogStatusEnum | undefined
) {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      const allPerson = await getUsersBySevaKendraIdDB(
        prismaTransaction,
        sevaKendraId
      );

      return { allPerson };
    });
    return transaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
}

export { getUsersDBTransaction, getUsersBySevaKendraIdDBTransaction };

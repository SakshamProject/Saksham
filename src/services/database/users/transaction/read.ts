import defaults from "../../../../defaults.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { Prisma } from "@prisma/client";
import { getUserDB, getUserTotal } from "../read.js";
import usersDefaults from "../defaults/usersDefaults.js";
import {userOrderByEnum} from "../../../../types/users/usersSchema.js";

const getUsersDBTransaction = async (
    start: number = defaults.skip,
    rows: number = defaults.take,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    orderBy: userOrderByEnum = usersDefaults.orderBy,
    userWhereInput: Prisma.UserWhereInput
) => {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
            try {
              const users = await getUserDB(
                prismaTransaction,
                sortOrder,
                orderBy,
                  userWhereInput
              );
              const total =await getUserTotal(
                 prismaTransaction,
                  userWhereInput
                );
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
  };
  export {getUsersDBTransaction}
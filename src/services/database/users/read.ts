import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { Prisma } from "@prisma/client";

async function getUserDB(
    prismaTransaction:Prisma.TransactionClient,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    orderBy:string,
    userWhereInput: Prisma.UserWhereInput
    ) {
    try {
          const results = await prismaTransaction.user.findMany({
            include: {
              designation : {
                include: {
                        sevaKendra: {
                        include: {
                                district: {
                                include: {
                                        state:true
                                    }
                            }
                        }
                    }
                }
              },
            },
            orderBy: {
              firstName: sortOrder,
            },
            where: userWhereInput});
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
          where: userWhereInput});
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
      include: {
        designation: {
          include: {
            sevaKendra: {
              include: {
                district: {
                  include: {
                    state: true
                  }
                }
              }
            }
          }
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
 
export {getUserDB,getUserTotal,getUserByIdDB}
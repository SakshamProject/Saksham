import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { Prisma } from "@prisma/client";

async function getUserDB(
    prismaTransaction: any,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    searchText: string = ""
    ) {
        try {
          const results = await prismaTransaction.users.findMany({
            include: {
              disability: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              name: sortOrder,
            },
            where: {
              name: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          });
      
          return results;
        } catch (err) {
          if (err instanceof Error) {
            throwDatabaseError(err);
          }
        }
      }
async function getUserTotal() {
    
}
export {getUserDB,getUserTotal}
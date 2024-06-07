import { Prisma } from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import prisma from "../database.js";

async function updateUserDB(
    prismaTransaction:Prisma.TransactionClient,
  userUpdateObject: Prisma.UserUpdateInput,
  id: string
) {
  try {
    const newUser = await prismaTransaction.user.update({
      where: {
        id: id,
      },
      data: userUpdateObject,
    });
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

async function updateUserProfileKeyDB(prisma: Prisma.TransactionClient, personId: string, data: Prisma.UserUpdateInput) {
  try {
    const result = await prisma.user.update({
      where: {
        personId: personId
      },
      data: data
    });
    return result
  } catch(error) {
    throwDatabaseError(error);
  }
}

export { updateUserDB, updateUserProfileKeyDB };

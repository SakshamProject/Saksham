import { Prisma } from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";

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

async function updateUserProfileKeyDB(key: string = "") {
}

export { updateUserDB, updateUserProfileKeyDB };

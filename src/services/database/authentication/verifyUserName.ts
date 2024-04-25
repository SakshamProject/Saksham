import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function verifyUserName(userName: string) {
  try {
    const person = await prisma.person.findUnique({
      where: {
        loginId: userName,
      },
      include: {
        user: true,
        password: true,
      },
    });
    return person;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

export{verifyUserName};

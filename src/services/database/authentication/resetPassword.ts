import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const checkPasswordDB = async (hashedPassword: string, personId: string) => {
  try {
    const password = await prisma.password.findFirst({
      where: { password: hashedPassword },
      select: {
        person: {
          where: {
            id: personId,
          },
        },
      },
    });
    return password === null ? false : true;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export default checkPasswordDB;

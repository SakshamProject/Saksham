import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function verifyDivyang(personId: string) {
  try {
    const divyang = await prisma.divyangDetails.findFirst({
      where: {
        personId: personId,
      },
    });
    return divyang;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

export { verifyDivyang };

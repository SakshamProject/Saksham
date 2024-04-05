import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function deleteDisabilityTypeDB(id: string) {
  try {
    const deleteddisabilityType = await prisma.disabilityType.delete({
      where: {
        id: id,
      },
      include: {
        disability: true,
      },
    });
    return deleteddisabilityType;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function deleteDisabilitySubTypeDB(prismaTransaction:any,id: string) {
  try {
    const deletedDisabilitySubType = await prismaTransaction.disabilitySubType.delete({
      where: {
        id: id,
      },
    });
    return deletedDisabilitySubType;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

export { deleteDisabilityTypeDB, deleteDisabilitySubTypeDB };

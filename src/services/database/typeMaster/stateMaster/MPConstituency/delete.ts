import { MPConstituency } from "../../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteMPConstituencyDB = async (
  id: string
): Promise<MPConstituency | undefined> => {
  try {
    const deletedMPConstituency: MPConstituency =
      await prisma.mPConstituency.delete({
        where: { id: id },
      });
    return deletedMPConstituency;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deleteMPConstituencyDB };

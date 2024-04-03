import { MLAConstituency } from "../../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteMLAConstituencyDB = async (
  id: string
): Promise<MLAConstituency | undefined> => {
  try {
    const deletedMLAConstituency: MLAConstituency = await prisma.mLAConstituency.delete({
      where: { id: id },
    });
    return deletedMLAConstituency;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deleteMLAConstituencyDB };

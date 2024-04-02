import { MLAConstituency } from "../../../../../types/typeMaster/stateMaster/MLAConstituencySchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateMLAConstituencyDB = async (
  id: string,
  MLAConstituency: MLAConstituency
): Promise<MLAConstituency | undefined> => {
  try {
    const updatedMLAConstituency: MLAConstituency =
      await prisma.mLAConstituency.update({
        where: {
          id: id,
          districtId: MLAConstituency.districtId,
        },
        data: {
          name: MLAConstituency.name,
        },
      });
    return updatedMLAConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateMLAConstituencyDB };

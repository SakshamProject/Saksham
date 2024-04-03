import { MPConstituency } from "../../../../../types/typeMaster/stateMaster/MPConstituencySchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateMPConstituencyDB = async (
  id: string,
  MPConstituency: MPConstituency
): Promise<MPConstituency | undefined> => {
  try {
    const updatedMPConstituency: MPConstituency =
      await prisma.mPConstituency.update({
        where: {
          id: id,
          districtId: MPConstituency.districtId,
        },
        data: {
          name: MPConstituency.name,
        },
      });
    return updatedMPConstituency;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateMPConstituencyDB };

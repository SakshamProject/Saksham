import { Taluk } from "../../../../../types/typeMaster/stateMaster/talukSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";
import prisma from "../../../database.js";

const updateTalukDB = async (
  id: string,
  taluk: Taluk
): Promise<Taluk | undefined> => {
  try {
    const updatedTaluk: Taluk = await prisma.taluk.update({
      where: {
        id: id,
        districtId: taluk.districtId,
      },
      data: {
        name: taluk.name,
      },
    });
    return updatedTaluk;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { updateTalukDB };

import { Taluk } from "../../../../../types/typeMaster/stateMaster/talukSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteTalukDB = async (id: string): Promise<Taluk | undefined> => {
  try {
    const deletedTaluk: Taluk = await prisma.taluk.delete({
      where: { id: id },
    });
    return deletedTaluk;
  } catch (error) {
    if (error instanceof Error) throw throwDatabaseError(error);
  }
};
export { deleteTalukDB };

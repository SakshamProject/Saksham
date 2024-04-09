import { State } from "../../../../../types/typeMaster/generalMaster/stateSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteStateDB = async (id: string): Promise<State | undefined> => {
  try {
    const deletedState: State = await prisma.state.delete({
      where: {
        id: id,
      },
    });
    return deletedState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { deleteStateDB };

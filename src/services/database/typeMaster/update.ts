import { getState } from "../../../models/typeMaster/get.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updateStateDB = async (
  state: getState,
  id: string
): Promise<getState | undefined> => {
  try {
    const updatedState = await prisma.state.update({
      where: {
        id: id,
      },
      data: {
        name: state.name,
      },
    });
    return updatedState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { updateStateDB };

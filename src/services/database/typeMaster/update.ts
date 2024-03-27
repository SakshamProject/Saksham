import { getState } from "../../../models/typeMaster/get.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updateStateDB = async (
  state: getState
): Promise<getState | undefined> => {
  try {
    const updatedState = await prisma.state.update({
      where: {
        id: state.id,
      },
      data: state,
    });
    return updatedState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { updateStateDB };

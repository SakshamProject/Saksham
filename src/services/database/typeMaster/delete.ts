import { getState } from "../../../models/typeMaster/get.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const deleteStateDB = async (state: getState) => {
  try {
    const deletedState = await prisma.state.delete({
      where: {
        id: state.id,
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

import { getStateSchema } from "../../../../types/typeMaster/stateMaster/stateSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";

const getStateDB = async (): Promise<getStateSchema[] | undefined> => {
  try {
    const states = await prisma.state.findMany();
    return states;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const getStateByIdDB = async (id: string): Promise<getStateSchema | undefined> => {
  try {
    const state = await prisma.state.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return state;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { getStateDB, getStateByIdDB };

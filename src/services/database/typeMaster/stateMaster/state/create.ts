import { Prisma } from "@prisma/client";
import { State } from "../../../../../types/typeMaster/stateMaster/stateSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createStateDB = async (
  state: Prisma.StateUncheckedCreateInput
): Promise<State | undefined> => {
  try {
    const createdState = await prisma.state.create({
      data: {
        name: state.name,
      },
    });
    return createdState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { createStateDB };

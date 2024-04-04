import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import { getStateSchema } from "../../../../../types/typeMaster/generalMaster/stateSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getStateDB = async (
  sortOrder: sortOrderEnum = sortOrderEnum.ascending
): Promise<getStateSchema[] | undefined> => {
  try {
    const states = await prisma.state.findMany({
      orderBy: {
        name: sortOrder,
      },
    });
    return states;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const getStateDBTotal = async () => {
  try {
    const states = await prisma.state.count({});
    return states;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const getStateByIdDB = async (
  id: string
): Promise<getStateSchema | undefined> => {
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

export { getStateDB, getStateByIdDB, getStateDBTotal };

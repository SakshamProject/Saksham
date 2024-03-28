import { getDistrictsWithState } from "../../../types/typeMaster/stateMaster/districtSchema.js";
import { getState } from "../../../types/typeMaster/stateMaster/stateSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getStateDB = async (): Promise<getState[] | undefined> => {
  try {
    const states = await prisma.state.findMany();
    return states;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const getStateByIdDB = async (id: string): Promise<getState | undefined> => {
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
const getDistrictDB = async (): Promise<
  getDistrictsWithState[] | undefined
> => {
  try {
    const districts = await prisma.district.findMany({
      include: { state: true },
    });
    return districts;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const getDistrictByIdDB = async (
  id: string
): Promise<getDistrictsWithState | undefined> => {
  try {
    const district: getDistrictsWithState =
      await prisma.district.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          state: true,
        },
      });
    return district;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { getStateDB, getStateByIdDB, getDistrictDB, getDistrictByIdDB };

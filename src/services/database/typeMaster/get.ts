import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {
  getDistrictsWithState,
  getState,
} from "../../../models/typeMaster/get.js";

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

export { getStateDB, getDistrictDB };

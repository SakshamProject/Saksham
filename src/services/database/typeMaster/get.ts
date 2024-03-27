import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const getStateDB = async () => {
  try {
    const states = await prisma.state.findMany();
    return states;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const getDistrictDB = async () => {
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

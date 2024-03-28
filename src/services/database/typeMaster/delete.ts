import { district, state } from "../../../models/typeMaster/zod.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const deleteStateDB = async (id: string): Promise<state | undefined> => {
  try {
    const deletedState: state = await prisma.state.delete({
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

const deleteDistrictDB = async (id: string): Promise<district | undefined> => {
  try {
    const deletedDistrict: district = await prisma.district.delete({
      where: {
        id: id,
      },
    });
    return deletedDistrict;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { deleteStateDB, deleteDistrictDB };

import { District } from "../../../types/typeMaster/stateMaster/districtSchema.js";
import { State } from "../../../types/typeMaster/stateMaster/stateSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const deleteStateDB = async (id: string): Promise<State | undefined> => {
  try {
    const deletedState: State = await prisma.state.delete({
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

const deleteDistrictDB = async (id: string): Promise<District | undefined> => {
  try {
    const deletedDistrict: District = await prisma.district.delete({
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

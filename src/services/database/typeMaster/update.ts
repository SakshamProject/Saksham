import { district, state } from "../../../models/typeMaster/zod.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updateStateDB = async (
  state: state,
  id: string
): Promise<state | undefined> => {
  try {
    const updatedState = await prisma.state.update({
      where: {
        id: id,
      },
      data: {
        name: state.name,
      },
    });
    return updatedState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const updateDistrictDB = async (
  id: string,
  district: district
): Promise<district | undefined> => {
  try {
    const updatedDistrict: district = await prisma.district.update({
      where: {
        id: id,
      },
      data: {
        name: district.name,
        stateId: district.stateId,
      },
    });
    return updatedDistrict;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { updateStateDB, updateDistrictDB };

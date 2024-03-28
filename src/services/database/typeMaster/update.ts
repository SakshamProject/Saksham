import { getDistrict, getState } from "../../../models/typeMaster/get.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updateStateDB = async (
  state: getState,
  id: string
): Promise<getState | undefined> => {
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
  district: getDistrict
): Promise<getDistrict | undefined> => {
  try {
    const updatedDistrict: getDistrict = await prisma.district.update({
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

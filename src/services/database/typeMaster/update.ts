import { District } from "../../../types/typeMaster/stateMaster/districtSchema.js";
import { State } from "../../../types/typeMaster/stateMaster/stateSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updateStateDB = async (
  state: State,
  id: string
): Promise<State | undefined> => {
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
  district: District
): Promise<District | undefined> => {
  try {
    const updatedDistrict: District = await prisma.district.update({
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

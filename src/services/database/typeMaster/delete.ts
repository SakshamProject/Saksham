import { Prisma } from "@prisma/client";
import {
  getDistrict,
  getDistrictsWithState,
  getState,
} from "../../../models/typeMaster/get.js";
import { state } from "../../../models/typeMaster/zod.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const deleteStateDB = async (id: string): Promise<getState | undefined> => {
  try {
    const deletedState: getState = await prisma.state.delete({
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

const deleteDistrictDB = async (
  id: string
): Promise<getDistrict | undefined> => {
  try {
    const deletedDistrict: getDistrict = await prisma.district.delete({
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

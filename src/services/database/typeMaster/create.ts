import { Prisma } from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const createDistrictDB = async (
  district: Prisma.DistrictUncheckedCreateInput
) => {
  try {
    const createdDistrict = await prisma.district.create({
      data: {
        name: district.name,
        stateId: district.stateId,
      },
    });
    return createdDistrict;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const createStateDB = async (state: Prisma.StateUncheckedCreateInput) => {
  try {
    const createdState = await prisma.state.create({
      data: {
        name: state.name,
      },
    });
    return createdState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { createDistrictDB, createStateDB };

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
    console.log("\n District created \n");
    console.log(createdDistrict);
    return createdDistrict;
  } catch (error) {
    if (error instanceof Error) {
      console.log("db error");
      console.log(error);
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
    console.log("\nCreated State");
    console.log(createdState);
    return createdState;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

export { createDistrictDB, createStateDB };

import { District, Prisma, State } from "@prisma/client";
import prisma from "../database.js";

const createDistrictDB = async (
  district: Prisma.DistrictUncheckedCreateInput
): Promise<District> => {
  const createdDistrict = await prisma.district.create({
    data: {
      name: district.name,
      stateId: district.stateId,
    },
  });
  console.log("\n District created \n");
  console.log(createdDistrict);
  return createdDistrict;
};

const createStateDB = async (
  state: Prisma.StateUncheckedCreateInput
): Promise<State> => {
  const createdState = await prisma.state.create({
    data: {
      name: state.name,
    },
  });
  console.log("\nCreated State");
  console.log(createdState);
  return createdState;
};

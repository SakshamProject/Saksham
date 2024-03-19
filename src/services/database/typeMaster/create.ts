import { District, State } from "@prisma/client";
import prisma from "../database.js";
const createDistrictDB = async (district: District): Promise<District> => {
  const createdDistrict = await prisma.district.create({
    data: district,
  });
  console.log("\n District created \n");
  console.log(createdDistrict);
  return district;
};

const createStateDB = async (state: State): Promise<State> => {
  const createdState = await prisma.state.create({
    data: state,
  });
  console.log("\nCreated State");
  console.log(createdState);
  return createdState;
};

export { createDistrictDB, createStateDB };

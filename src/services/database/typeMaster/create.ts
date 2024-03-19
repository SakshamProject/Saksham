import { District, State } from "@prisma/client";
import prisma from "../database.js";
const createDistrictDB = async (district: District) => {
  const createdDistrict = await prisma.district.create({
    data: district,
  });
  console.log("\n District created \n");
  console.log(createdDistrict);
};

const createStateDB = async (state: State) => {
  const createdState = await prisma.state.create({
    data: state,
  });
  console.log("\nCreated State");
  console.log(createdState);
};

export { createDistrictDB, createStateDB };

import { District, State } from "@prisma/client";
import prisma from "../database.js";

const getStateIdByName = async (name: string): Promise<string> => {
  console.log(name);
  const stateId = await prisma.state.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });
  console.log(stateId);
  return stateId?.id == undefined ? "007" : stateId?.id;
};
const getDistrictIdByName = async (name: string): Promise<string> => {
  console.log(name);
  const districtId = await prisma.district.findFirst({
    where: {
      name: name,
    },
    select: {
      id: true,
    },
  });
  console.log(districtId);
  return districtId?.id == undefined ? "007" : districtId?.id;
};
const getStateDB = async (): Promise<State[]> => {
  const states = await prisma.state.findMany();
  return states;
};
const getDistrictDB = async (): Promise<District[]> => {
  const districts = await prisma.district.findMany({
    include: { state: true },
  });
  return districts;
};

export { getStateIdByName, getStateDB, getDistrictDB, getDistrictIdByName };

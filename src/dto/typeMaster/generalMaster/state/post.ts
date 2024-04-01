import { Prisma } from "@prisma/client";
import { District } from "../../../../types/typeMaster/generalMaster/districtSchema.js";
import { State } from "../../../../types/typeMaster/generalMaster/stateSchema.js";
//import { district, state } from "../../types/typeMaster/zod.js";

const createStateDBObject = (
  state: State
): Prisma.StateUncheckedCreateInput => {
  const newState: Prisma.StateUncheckedCreateInput = {
    name: state.name,
  };
  return newState;
};

const createDistrictDBObject = (
  district: District
): Prisma.DistrictUncheckedCreateInput => {
  const newDistrict: Prisma.DistrictUncheckedCreateInput = {
    name: district.name,
    stateId: district.stateId,
  };
  return newDistrict;
};

export { createStateDBObject, createDistrictDBObject };

import { Prisma } from "@prisma/client";
import { district, state } from "../../types/typeMaster/zod.js";

const createStateDBObject = (
  state: state
): Prisma.StateUncheckedCreateInput => {
  const newState: Prisma.StateUncheckedCreateInput = {
    name: state.name,
  };
  return newState;
};

const createDistrictDBObject = (
  district: district
): Prisma.DistrictUncheckedCreateInput => {
  const newDistrict: Prisma.DistrictUncheckedCreateInput = {
    name: district.name,
    stateId: district.stateId,
  };
  return newDistrict;
};

export { createStateDBObject, createDistrictDBObject };

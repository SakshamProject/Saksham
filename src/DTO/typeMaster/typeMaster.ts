import { District, State } from "@prisma/client";
import {
  DistrictRequest,
  StateRequest,
} from "../../models/typeMaster/typeMaster.js";
import { randomUUID } from "crypto";
import { getStateIdByName } from "../../services/database/typeMaster/get.js";

const createStateDBObject = (state: StateRequest): State => {
  const stateDBObject: State = {
    id: randomUUID(),
    name: state.name,
  };
  return stateDBObject;
};
const createDistrictDBObject = async (
  district: DistrictRequest
): Promise<District> => {
  const stateId: string = await getStateIdByName(district.state);
  const districtDBObject: District = {
    id: randomUUID(),
    name: district.name,
    stateId: stateId,
  };
  return districtDBObject;
};
export { createStateDBObject, createDistrictDBObject };

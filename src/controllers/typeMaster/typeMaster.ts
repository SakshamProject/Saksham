import { Request, Response } from "express";
import {
  DistrictRequest,
  StateRequest,
} from "../../models/typeMaster/typeMaster.js";
import {
  getDistrictDB,
  getStateDB,
  getStateIdByName,
} from "../../services/database/typeMaster/get.js";
import {
  createDistrictDBObject,
  createStateDBObject,
} from "../../DTO/typeMaster/typeMaster.js";
import { District, State } from "@prisma/client";
import {
  createDistrictDB,
  createStateDB,
} from "../../services/database/typeMaster/create.js";
import { request } from "http";

const postState = async (request: Request, response: Response) => {
  const newState: StateRequest = request.body;
  const stateDBObject: State = createStateDBObject(newState);
  const result = await createStateDB(stateDBObject);
  response.send(result);
};

const getState = async (request: Request, response: Response) => {
  const result = await getStateDB();
  response.send(result);
};

const postDistrict = async (request: Request, response: Response) => {
  const newDistrict: DistrictRequest = request.body;
  const districtDBObject: District = await createDistrictDBObject(newDistrict);
  const result = await createDistrictDB(districtDBObject);
  response.send(result);
};
const getDistrict = async (request: Request, response: Response) => {
  const result = await getDistrictDB();
  response.send(result);
};
export { getState, postState, getDistrict, postDistrict };

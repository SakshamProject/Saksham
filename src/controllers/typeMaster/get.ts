import { Request, Response } from "express";
import {
  getDistrictDB,
  getStateDB,
} from "../../services/database/typeMaster/get.js";
import {
  getDistrictsWithState,
  getState,
} from "../../models/typeMaster/get.js";

const getState = async (request: Request, response: Response) => {
  const result: getState[] | undefined = await getStateDB();
  response.send(result);
};

const getDistrict = async (request: Request, response: Response) => {
  const result: getDistrictsWithState[] | undefined = await getDistrictDB();
  response.send(result);
};

export { getState, getDistrict };

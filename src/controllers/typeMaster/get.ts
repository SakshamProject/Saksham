import { Request, Response } from "express";
import {
  getDistrictDB,
  getStateDB,
} from "../../services/database/typeMaster/get.js";

const getState = async (request: Request, response: Response) => {
  const result = await getStateDB();
  response.send(result);
};

const getDistrict = async (request: Request, response: Response) => {
  const result = await getDistrictDB();
  response.send(result);
};
export { getState, getDistrict };

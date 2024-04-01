import { NextFunction, Request, Response } from "express";

const getCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};

const getCorporationById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};
const getCorporationByDistrictId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};
export { getCorporationById, getCorporation, getCorporationByDistrictId };

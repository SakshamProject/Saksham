import { NextFunction, Request, Response } from "express";

const getCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};

const getByIdCorporation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {};

export { getByIdCorporation, getCorporation };

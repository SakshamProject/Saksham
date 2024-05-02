import { NextFunction, Request, Response } from "express";

async function divyangLogout(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    response.clearCookie("token");
    response.send("logout Successfull");
  } catch (err) {
    next(err);
  }
}

export default divyangLogout;

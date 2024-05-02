import { NextFunction, Request, Response } from "express";
import { updatePasswordSchema } from "../../types/authentication/authenticationSchema.js";
import config from "../../../config.js";
import defaults from "../../defaults.js";
import * as crypto from "crypto";
import updatePasswordDB from "../../services/database/authentication/updatePassword.js";
const updatePassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const personId = request.params.id;
    const body = updatePasswordSchema.parse(request.body);
    const hashedPassword = crypto
      .createHmac(defaults.hashingAlgorithm, config.SECRET)
      .update(body.password)
      .digest("hex");
    const person = await updatePasswordDB(personId, hashedPassword);
    response.send("Password updation successfull");
  } catch (error) {
    next(error);
  }
};

export default updatePassword;

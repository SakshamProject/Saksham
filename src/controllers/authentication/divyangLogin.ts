import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import defaults from "../../defaults.js";
import APIError from "../../services/errors/APIError.js";
import {
  loginSchemaType,
  loginSchema,
} from "../../types/authentication/authenticationSchema.js";
import config from "../../../config.js";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { verifyDivyang } from "../../services/database/authentication/verifyUser.js";
import {generateFileURLResponseFromKey} from "../../services/s3/s3.js";

async function divyangLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    const divyang = await verifyDivyang(body.userName) as {id: string, profilePhotoFile?: string, profilePhotoFileName?: string, firstName: string, lastName: string, person: {id: string, userName: string, password?: {id: string, password: string}}};
    if (!divyang) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CreditialError",
        "S"
      );
    }
    const givenPassword = crypto
      .createHmac(defaults.hashingAlgorithm, config.SECRET)
      .update(body.password)
      .digest("hex");
    if (givenPassword !== divyang.person.password?.password) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CreditialError",
        "S"
      );
    }
    delete divyang.person.password;
    const token = jwt.sign({ personId: divyang.person.id }, config.SECRET, {
      expiresIn: "7d",
    });

    // response.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000,
    //   sameSite: true,
    // });

    let file = {};
    if (divyang?.profilePhotoFile) {
      file = {
        "profilePhoto": await generateFileURLResponseFromKey(divyang.profilePhotoFile)
      }
    }

    response.json({
      message: "Logged in successfully",
      token: token,
      file: file,
      divyang: divyang,
    });
  } catch (err) {
    next(err);
  }
}

export default divyangLogin;
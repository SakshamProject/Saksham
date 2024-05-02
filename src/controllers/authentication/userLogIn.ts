import { NextFunction, Request, Response } from "express";
import * as crypto from "crypto";
import defaults from "../../defaults.js";
import config from "../../../config.js";
import jwt from "jsonwebtoken";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import { verifyUser } from "../../services/database/authentication/verifyUser.js";
import {
  loginSchema,
  loginSchemaType,
} from "../../types/authentication/authenticationSchema.js";

async function userLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    const user = await verifyUser(body.userName);
    if (!user) {
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

    if (givenPassword !== user.person.password.password) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CreditialError",
        "S"
      );
    }
    const token = jwt.sign(
      { personId: user.person.id, userId: user.id },
      config.SECRET,
      { expiresIn: "7d" }
    );

    user.person.password = {
      id: "PROTECTED",
      password: "PROTECTED",
    };

    // response.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000,
    //   sameSite: true,
    // });

    response.json({
      message: "Logged in successfully",
      user: user,
      token: token,
    });
  } catch (err) {
    next(err);
  }
}

export default userLogin;

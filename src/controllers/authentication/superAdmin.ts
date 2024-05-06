import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import defaults, { superAdmin } from "../../defaults.js";
import APIError from "../../services/errors/APIError.js";
import {
  loginSchemaType,
  loginSchema,
} from "../../types/authentication/authenticationSchema.js";
import config from "../../../config.js";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { verifyDivyang } from "../../services/database/authentication/verifyUser.js";

async function superAdminLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    const admin = superAdmin.some(
      (admin) =>
        admin.userName === body.userName && admin.password === body.password
    );
    if (!admin) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CreditialError",
        "S"
      );
    }

    const token = jwt.sign({ superAdmin: body.userName }, config.SECRET, {
      expiresIn: "7d",
    });

    // response.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000,
    //   sameSite: true,
    // });

    response.json({
      message: "Logged in successfully",
      token: token,
      superAdmin: body.userName,
    });
  } catch (err) {
    next(err);
  }
}

export default superAdminLogin;

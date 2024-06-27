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
import verifySuperAdminDB from "../../services/database/authentication/verifySuperAdmin.js";

async function superAdminLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    const hashedPassword = crypto
      .createHmac(defaults.hashingAlgorithm, config.SECRET)
      .update(body.password)
      .digest("hex");
    const admin = await verifySuperAdminDB(body.userName, hashedPassword);
    if (!admin) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CredentialError",
        "S"
      );
    }

    const token = jwt.sign(
      { superAdminId: admin.id, personId: admin.personId },
      config.SECRET,
      {
        expiresIn: "7d",
      }
    );

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

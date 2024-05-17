import { NextFunction, Request, Response } from "express";
import config from "../../../config.js";
import jwt from "jsonwebtoken";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import { verifyUser } from "../../services/database/authentication/verifyUser.js";
import {
  loginSchema,
  loginSchemaType,
} from "../../types/authentication/authenticationSchema.js";
import log from "../../services/logger/logger.js";
import {hashPassword} from "../../dto/users/post.js";
import {generateFileURLResponseFromKey} from "../../services/s3/s3.js";

async function userLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    log("info", "[post/userLogin] body: %o", body);
    const user = await verifyUser(body.userName) as {id: string, person: {password?: {id: string, password: string}, id: string, userName: string}, profilePhotoFile?: string, profilePhotoFileName?: string, designation: {id: string, name: string, features: {feature: {id: string, name: string}}[]}}
    log("info", "[post/userLogin] user: %o", user);
    if (!user) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CredentialError",
        "S"
      );
    }
    const givenPassword = hashPassword(body.password);

    log("info", "[post/userLogin] given password: %o", givenPassword);
    if (givenPassword !== user.person.password?.password) {
      throw new APIError(
        "Username or password is incorrect",
        StatusCodes.BAD_REQUEST,
        "CredentialError",
        "S"
      );
    }
    const token = jwt.sign(
      { personId: user.person.id, userId: user.id },
      config.SECRET,
      { expiresIn: "7d" }
    );

    delete user.person.password;

    // response.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000,
    //   sameSite: true,
    // });

    // profile photo

    let file = {};
    if (user?.profilePhotoFile) {
      file = {
        "profilePhoto": await generateFileURLResponseFromKey(user.profilePhotoFile)
      }
    }

    response.json({
      message: "Logged in successfully",
      user: user,
      file: file,
      token: token,
    });
  } catch (err) {
    next(err);
  }
}

export default userLogin;

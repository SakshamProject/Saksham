import { NextFunction, Request, Response } from 'express';
import config from '../../../config.js';
import jwt from 'jsonwebtoken';
import APIError from '../../services/errors/APIError.js';
import { StatusCodes } from 'http-status-codes';
import { verifyUser } from '../../services/database/authentication/verifyUser.js';
import {
  loginSchema,
  loginSchemaType,
} from '../../types/authentication/authenticationSchema.js';
import { hashPassword } from '../../dto/users/post.js';
import { getFileFromCloud } from '../../services/files/get.js';

async function userLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    const givenPassword = hashPassword(body.password);
    const user = await verifyUser(body.userName, givenPassword);
    if (!user) {
      throw new APIError(
        'Username or password is incorrect',
        StatusCodes.BAD_REQUEST,
        'CredentialError',
        'S'
      );
    }

    const token = jwt.sign(
      { personId: user.person.id, userId: user.id },
      config.SECRET,
      { expiresIn: '7d' }
    );

    let file = {};
    if (user?.profilePhotoKey) {
      file = {
        profilePhoto: await getFileFromCloud(user.profilePhotoKey),
      };
    }

    response.json({
      message: 'Logged in successfully',
      user: user,
      file: file,
      token: token,
    });
  } catch (err) {
    next(err);
  }
}

export default userLogin;

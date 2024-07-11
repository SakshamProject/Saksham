import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import defaults from '../../defaults.js';
import APIError from '../../services/errors/APIError.js';
import {
  loginSchemaType,
  loginSchema,
} from '../../types/authentication/authenticationSchema.js';
import config from '../../../config.js';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { verifyDivyang } from '../../services/database/authentication/verifyUser.js';
import { getFileFromCloud } from '../../services/files/get.js';

async function divyangLogin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body);
    const givenPassword = crypto
      .createHmac(defaults.hashingAlgorithm, config.SECRET)
      .update(body.password)
      .digest('hex');
    const divyang = await verifyDivyang(body.userName, givenPassword);
    if (!divyang) {
      throw new APIError(
        'Username or password is incorrect',
        StatusCodes.BAD_REQUEST,
        'CreditialError',
        'S'
      );
    }

    const token = jwt.sign({ personId: divyang.person.id }, config.SECRET, {
      expiresIn: '7d',
    });

    let file = {};
    if (divyang?.profilePhotoKey) {
      file = {
        profilePhoto: await getFileFromCloud(divyang.profilePhotoKey),
      };
    }

    response.json({
      message: 'Logged in successfully',
      token: token,
      file: file,
      divyang: divyang,
    });
  } catch (err) {
    next(err);
  }
}

export default divyangLogin;

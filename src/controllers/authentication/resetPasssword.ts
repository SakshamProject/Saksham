import { NextFunction, Request, Response } from 'express';
import { resetPasswordSchema } from '../../types/authentication/authenticationSchema.js';
import defaults from '../../defaults.js';
import config from '../../../config.js';
import * as crypto from 'crypto';
import checkPasswordDB from '../../services/database/authentication/resetPassword.js';
import updatePasswordDB from '../../services/database/authentication/updatePassword.js';
import APIError from '../../services/errors/APIError.js';
import { StatusCodes } from 'http-status-codes';

const resetPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const personId = request.token?.personId;
    if (personId) {
      const body = resetPasswordSchema.parse(request.body);
      const hashedPassword = crypto
        .createHmac(defaults.hashingAlgorithm, config.SECRET)
        .update(body.oldPassword)
        .digest('hex');
      const newPassword = crypto
        .createHmac(defaults.hashingAlgorithm, config.SECRET)
        .update(body.newPassword)
        .digest('hex');
      const isValidPassword = await checkPasswordDB(hashedPassword, personId);
      if (isValidPassword) {
        await updatePasswordDB(personId, newPassword);
      } else {
        throw new APIError(
          "Incorrect Old Password",
          StatusCodes.BAD_REQUEST,
          'PasswordError',
          'S'
        );
      }
    }
    response.send('NO personId available');
  } catch (error) {
    next(error);
  }
};

export default resetPassword;

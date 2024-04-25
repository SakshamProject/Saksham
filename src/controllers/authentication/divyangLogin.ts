import { NextFunction, Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import defaults from '../../defaults.js'
import { verifyUserName } from '../../services/database/authentication/verifyUserName.js'
import APIError from '../../services/errors/APIError.js'
import {
  loginSchemaType,
  loginSchema,
} from '../../types/authentication/authenticationSchema.js'
import userLogin from './userLogIn.js'
import config from '../../../config.js'
import * as crypto from 'crypto'
import jwt from 'jsonwebtoken'

async function divyangLogin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const body: loginSchemaType = loginSchema.parse(request.body)
    const person = await verifyUserName(body.userName)
    if (!person) {
      throw new APIError(
        'Username or password is incorrect',
        StatusCodes.UNAUTHORIZED,
        'CreditialError',
        'S',
      )
    }
    const givenPassword = crypto
      .createHmac(defaults.hashingAlgorithm, config.SECRET)
      .update(body.password)
      .digest('hex')

    if (givenPassword !== person.password.password) {
      console.log(`[+]password wrong`)

      throw new APIError(
        'Username or password is incorrect',
        StatusCodes.UNAUTHORIZED,
        'CreditialError',
        'S',
      )
    }
    const token = jwt.sign(
      { sub: person.id, designationId: person.user?.designationId, user: true },
      config.SECRET,
      { expiresIn: '1h' },
    )

    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: true,
    })

    response.json({ message: 'Logged in successfully', person })
  } catch (err) {
    next(err)
  }
}

export default divyangLogin

import { NextFunction, Request, Response } from "express";
import { userForgetPasswordSchema } from "../../types/authentication/authenticationSchema.js";
import { StatusCodes } from "http-status-codes";
import APIError from "../../services/errors/APIError.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { verifyUserForForgetPassword } from "../../services/database/authentication/verifyUser.js";

const userForgetPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = userForgetPasswordSchema.parse(request.body);
    const user = await verifyUserForForgetPassword(body);
    if (user === null) {
      throw new APIError(
        "User Details doesn't exist ",
        StatusCodes.NOT_FOUND,
        "InvalidCredentials",
        "S"
      );
    }
    const responseData = createResponseOnlyData(user);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export default userForgetPassword;

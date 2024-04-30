import { NextFunction, Request, Response } from "express";
import { divyangForgetPasswordSchema } from "../../types/authentication/authenticationSchema.js";
import { verifyDivyangForForgetPassword } from "../../services/database/authentication/verifydivyang.js";
import { StatusCodes } from "http-status-codes";
import APIError from "../../services/errors/APIError.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

const divyangForgetPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const body = divyangForgetPasswordSchema.parse(request.body);
    const divyang = await verifyDivyangForForgetPassword(body);
    if (divyang === null) {
      throw new APIError(
        "Divyang Details doesn't exist ",
        StatusCodes.NOT_FOUND,
        "InvalidCredentials",
        "S"
      );
    }
    const responseData = createResponseOnlyData(divyang);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export default divyangForgetPassword;

import { NextFunction, Request, Response } from "express";
import { getDesignationByIDDB } from "../../services/database/designation/read.js";
import { designationGetByIdType } from "../../types/designation/designationSchema.js";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";
import { getUserByIdAuthDB } from "../../services/database/authentication/verifyUserName.js";

function authorization(
  currentFeature: AuthorizationEnum,
  method: MethodsEnum = MethodsEnum.DEFAULT
) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      //user
      if (request.token?.userId) {
        const user = await getUserByIdAuthDB(request.token.userId);
        const designationId = user?.designationId;
        const designation: designationGetByIdType | undefined =
          await getDesignationByIDDB(designationId);

        if (
          !designation?.features.some(
            (feature) => feature.feature.name === currentFeature
          )
        ) {
          throw new APIError(
            "Permission denied",
            StatusCodes.UNAUTHORIZED,
            "AccessDenied",
            "S"
          );
        }
      } else {
        //divyang
        console.log(currentFeature);
        console.log("method: ", method);
        console.log(
          "title thaan ithu",
          currentFeature === AuthorizationEnum.DIVYANG_DETAILS &&
            method === MethodsEnum.GET_BY_ID
        );
        if (
          !(
            (currentFeature === AuthorizationEnum.DIVYANG_DETAILS &&
              (method === MethodsEnum.GET_BY_ID ||
                method === MethodsEnum.POST ||
                method === MethodsEnum.PUT)) ||
            (currentFeature === AuthorizationEnum.SERVICE_MAPPING &&
              (method === MethodsEnum.POST || method === MethodsEnum.GET_BY_ID))
          )
        ) {
          throw new APIError(
            "Permission denied",
            StatusCodes.UNAUTHORIZED,
            "AccessDenied",
            "S"
          );
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
export default authorization;

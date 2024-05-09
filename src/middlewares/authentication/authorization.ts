import { NextFunction, Request, Response } from "express";
import { getDesignationByIDDB } from "../../services/database/designation/read.js";
import { designationGetByIdType } from "../../types/designation/designationSchema.js";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";
import { getUserByIdAuthDB } from "../../services/database/authentication/verifyUser.js";

function authorization(
  currentFeature: AuthorizationEnum,
  method: MethodsEnum = MethodsEnum.DEFAULT
) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      //superAdmin
      if (request.token?.superAdminId) {
        return next();
      }
      //user
      if (request.token?.userId) {
        if (
          MethodsEnum.USER_DROPDOWN === method ||
          method === MethodsEnum.DIVYANG_DROPDOWN
        ) {
          return next();
        }
        const user = await getUserByIdAuthDB(request.token.userId);
        const designationId = user?.designationId;
        const designation = await getDesignationByIDDB(designationId);

        if (
          currentFeature === AuthorizationEnum.SERVICE_MAPPING &&
          !designation?.features.some(
            (feature) => feature.feature.name === currentFeature
          )
        ) {
          request.admin = false;
          return next();
        }
        if (
          !designation?.features.some(
            (feature) => feature.feature.name === currentFeature
          )
        ) {
          // this can also be thrown when designation is changed after current login session
          throw new APIError(
            "Permission denied for user",
            StatusCodes.UNAUTHORIZED,
            "AccessDenied",
            "S"
          );
        }
        if (
          currentFeature === AuthorizationEnum.DIVYANG_DETAILS &&
          !designation?.features.some(
            (feature) =>
              feature.feature.name === AuthorizationEnum.SERVICE_MAPPING
          )
        ) {
          request.admin = false;
          return next();
        }
      } else {
        //divyang
        if (method === MethodsEnum.DIVYANG_DROPDOWN) {
          return next();
        }
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
            "Permission denied for divyang",
            StatusCodes.UNAUTHORIZED,
            "AccessDenied",
            "S"
          );
        }
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
}
export default authorization;

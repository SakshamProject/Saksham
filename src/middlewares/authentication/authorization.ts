import { NextFunction, Request, Response } from "express";
import { getDesignationByIDDB } from "../../services/database/designation/read.js";
import { designationGetByIdType } from "../../types/designation/designationSchema.js";
import APIError from "../../services/errors/APIError.js";
import { StatusCodes } from "http-status-codes";
import {
  AuthorizationEnum,
} from "../../types/authentication/authorizationEnum.js";
import { getUserByIdDB } from "../../services/database/users/read.js";

 function authorization(currentFeature: AuthorizationEnum) {
  return async (request: Request, response: Response, next: NextFunction) => {
  

    if (request.token?.userId) {

      const user = await getUserByIdDB(request.token.userId);
      const designationId = user?.designationId;
      const designation: designationGetByIdType | undefined =
        await getDesignationByIDDB(designationId);

      if (
        !designation?.features.some(
          (feature) => feature.feature.name === currentFeature
        )
      ) {
        next(new APIError(
          "Permission denied",
          StatusCodes.UNAUTHORIZED,
          "AccessDenied",
          "S"
        )) 
      }
    } else {
      if (
        !(
          currentFeature === AuthorizationEnum.DIVYANG_DETAILS ||
          currentFeature === AuthorizationEnum.GET_SERVICE_MAPPING ||
          currentFeature === AuthorizationEnum.POST_SERVICE_MAPPING
        )
      ) {
        next(new APIError(
          "Permission denied",
          StatusCodes.UNAUTHORIZED,
          "AccessDenied",
          "S"
        )) 
      }
    }

    next();
  };
}
export default authorization;

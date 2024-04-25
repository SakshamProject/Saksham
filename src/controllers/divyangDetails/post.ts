import { NextFunction, Response, Request } from "express";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { DivyangDetails } from "@prisma/client";
import {
  createDivyangDetails,
  postDivyangDetailsRequest,
  postDivyangDetailsRequestSchema,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import { createDivyangDetailsDBObject } from "../../dto/divyangDetails/post.js";
import { createDivyangDetailsDB } from "../../services/database/divyangDetails/create.js";
import { DivyangSignUp, divyangSignUpRequestSchema } from "../../types/divyangDetails/personalDetailsSchema.js";

async function postDivyangDetails(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const createdBy = request.user.id;
    const divyangDetails: DivyangSignUp =
      divyangSignUpRequestSchema.parse(request.body);
    const divyangDetailsDBObject: createDivyangDetails =
      createDivyangDetailsDBObject(divyangDetails, createdBy);
    const result: DivyangDetails | undefined = await createDivyangDetailsDB(
      divyangDetailsDBObject
    );

    const responseData = createResponseOnlyData(result || {});

    response.send(responseData);
  } catch (error) {
    next(error);
  }
}

export { postDivyangDetails };

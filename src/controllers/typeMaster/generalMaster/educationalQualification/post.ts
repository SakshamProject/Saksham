import { NextFunction, Response, Request } from "express";
import { postEducationQualificationTypeDBTransaction } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/transaction/create.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";
import { postEducationalQualificationBodyType, postRequestEducationQualification } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";


async function postEducationQualificationType(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const body: postEducationalQualificationBodyType = postRequestEducationQualification.parse(request.body);

    const result = await postEducationQualificationTypeDBTransaction(body);

    const responseData = createResponseOnlyData(result || {});

    response.send(responseData)

  } catch (err) {
    next(err)
  }
}

export { postEducationQualificationType }

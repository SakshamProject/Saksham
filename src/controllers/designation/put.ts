import { NextFunction, Request, Response } from "express";
import { updateDisabilityTypeRequestSchemaType } from "../../types/typeMaster/generalMaster/disabilityType.js";
import { updateDesignationRequestSchema, updateDesignationRequestSchemaType } from "../../types/designation/designationSchema.js";
import { putDesignationDBTransaction } from "../../services/database/designation/transaction/update.js";
import { getDisabilityTypeByIdDB } from "../../services/database/typeMaster/generalMaster/disabilityType/read.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { getDesignationByIDDB } from "../../services/database/designation/read.js";

async function putDesignation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const body: updateDesignationRequestSchemaType =
        updateDesignationRequestSchema.parse(request.body);

        const updatedById :string|undefined = request.user?.id;
  
      const id :string = request.params.id;
  
      const result = await putDesignationDBTransaction(body,id,updatedById);
  
      const responseResult = await getDesignationByIDDB(result);
  
      const responseData = createResponseOnlyData(responseResult || {});
  
      response.send(responseData);
    } catch (err) {
      next(err);
    }
  }
  
  export { putDesignation };
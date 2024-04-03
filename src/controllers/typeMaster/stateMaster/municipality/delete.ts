import { NextFunction, Request, Response } from "express";
import { deleteMunicipalityDB } from "../../../../services/database/typeMaster/stateMaster/municipality/delete.js";
import { Municipality } from "../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const deleteMunicipality = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id: string = request.params.id;
    const result: Municipality | undefined = await deleteMunicipalityDB(id);
    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};
export { deleteMunicipality };

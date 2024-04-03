import { NextFunction, Request, Response } from "express";
import {
  Municipality,
  municipalitySchema,
} from "../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import { updateMunicipalityDB } from "../../../../services/database/typeMaster/stateMaster/municipality/update.js";
import { createResponseOnlyData } from "../../../../types/createResponseSchema.js";

const putMunicipality = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const municipality = municipalitySchema.parse(request.body);
    const result: Municipality | undefined = await updateMunicipalityDB(
      id,
      municipality
    );

    const responseData = createResponseOnlyData(result || {});
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { putMunicipality };

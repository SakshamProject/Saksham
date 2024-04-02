import { NextFunction, Request, Response } from "express";
import {
  Municipality,
  municipalitySchema,
} from "../../../../types/typeMaster/stateMaster/municipalitySchema.js";
import { createMunicipalityDB } from "../../../../services/database/typeMaster/stateMaster/municipality/create.js";

const postMunicipality = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const municipality: Municipality = municipalitySchema.parse(request.body);
    const result: Municipality | undefined = await createMunicipalityDB(
      municipality
    );
    response.send(result);
  } catch (error) {
    next(error);
  }
};
export { postMunicipality };

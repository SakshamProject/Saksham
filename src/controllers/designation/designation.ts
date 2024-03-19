import { Request, Response } from "express";
import {
  createDesignationDB,
  getDesignationDB,
  getIdByNameDB,
} from "../../services/database/designation/designation.js";
import getRequestSchema from "../getRequest.schema.js";

async function getDesignation(
  request: Request,
  response: Response
): Promise<void> {
  const { start, rows, orderBy, orderByDirection} = getRequestSchema.parse(
    request.query
  );
  const orderByColumn: string|undefined = orderBy;

  const results = await getDesignationDB(
    start,
    rows,
    orderByColumn,
    orderByDirection
  );
 
  response.send(results);
}

async function postDesignation(request: Request, response: Response) {
  const { state, district, sevaKendraId, designation, features } = request.body;
  const features_id = await Promise.all(
    features.map((name) => getIdByNameDB("Feature", name))
  );
    console.log(features_id)
  const newDesignation = await createDesignationDB(
    sevaKendraId,
    designation,
    features_id
  );
  response.send(newDesignation);
}

export { getDesignation, postDesignation };

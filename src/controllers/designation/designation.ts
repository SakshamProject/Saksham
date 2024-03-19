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
  const { start, rows, orderBy, reverse } = getRequestSchema.parse(
    request.query
  );
  const orderByDirection: "asc" | "desc" = reverse === "true" ? "desc" : "asc";
  const orderByColumn: string|undefined = orderBy;

  const results = await getDesignationDB(
    start,
    rows,
    orderByColumn,
    orderByDirection
  );
  results["start"] = start + 1;
  results["rows"] = results["results"].length;
  results["orderBy"] = orderBy;
  results["reverse"] = reverse;
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

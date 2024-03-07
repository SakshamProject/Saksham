import { Request, Response } from "express";
import { getDesignationDB, getIdByNameDB } from "../../services/database/designation/designation.js";
import getRequestSchema from "../getRequest.schema.js";




async function getDesignation(
  request: Request,
  response: Response
): Promise<void> {
    console.log("enters getdesignation controller function ")
  const { start, rows, orderBy, reverse } = getRequestSchema.parse(
    request.query
  );
  const orderByDirection: "asc" | "desc" = reverse === "true" ? "desc" : "asc";
  const orderByColumn: string = orderBy;

  const results = await getDesignationDB(
    start,
    rows,
    orderByColumn,
    orderByDirection
  );
  results["start"] = start + 1;
  results["rows"] = rows;
  results["orderBy"] = orderBy;
  results["reverse"] = reverse;
  response.send(results);
}

async function postDesignation(request:Request, response:Response){

    //const reqBody = request.body;
    const {state, district,sevaKendra,designation,features}=request.body;
    const features_id = await Promise.all(features.map(name => getIdByNameDB('Feature', name)));

    //const sevakendra_id = await getIdByNameDB('sevaKendra',sevaKendra);

    response.send(features_id)

}


export { getDesignation ,postDesignation};

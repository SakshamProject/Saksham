import { Request, Response } from "express";
import {
  createDesignationDB,
  getDesignationByID,
  getDesignationDB,
  getIdByNameDB,
} from "../../services/database/designation/designation.js";
import getRequestSchema from "../getRequest.schema.js";

async function getDesignation(
  request: Request,
  response: Response
){
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

async function getDesignationById( request: Request,response: Response){
  const id = request.params.id;
  const designation = await getDesignationByID(id);
  response.send(designation);
 
}

async function postDesignation(request: Request, response: Response) {
  const { state, districtId, sevaKendraId, designation, featuresId } = request.body;
  console.log(state )
  console.log(designation)

  const newDesignation = await createDesignationDB(
    sevaKendraId,
    designation,
  );
  response.send(newDesignation);
}

export { getDesignation, postDesignation,getDesignationById };

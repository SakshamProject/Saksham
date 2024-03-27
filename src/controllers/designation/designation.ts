import { Request, Response } from "express";
import {
  createDesignationDB,
  createFeaturesOnDesignationDB,
  deleteDesignationDB,
  getDesignationByID,
  getDesignationByNameDB,
  getDesignationDB,
} from "../../services/database/designation/designation.js";
import getRequestSchema from "../getRequest.schema.js";
import { postRequestSchema } from "./designation.schema.js";
import { createDesignationDBObject, createFeaturesOnDesignationDBObject } from "../../DTO/designation/designation.js";
import { Designation } from "@prisma/client";


async function getDesignation(request: Request, response: Response) {
  const { start, rows, orderBy, orderByDirection } = getRequestSchema.parse(
    request.query
  );
  const orderByColumn: string | undefined = orderBy;

  const results = await getDesignationDB(
    start,
    rows,
    orderByColumn,
    orderByDirection
  );

  response.send(results);
}

async function getDesignationById(request: Request, response: Response) {
  const id: string = request.params.id;
  const designation = await getDesignationByID(id);
  response.send({
    "data":designation
  })
}

async function getDesignationByName(request: Request, response: Response) {
  const name: string = request.params.name;
  const designation = await getDesignationByNameDB(name);
 
  response.send({
    "data":designation
  })
}

async function postDesignation(request: Request, response: Response) {

  const postDesignationRequest = postRequestSchema.parse(request.body);
  const dataObject = await createDesignationDBObject(postDesignationRequest);
  const newDesignation:Designation = await createDesignationDB(dataObject);
  const designationId:string = newDesignation.id;
  const FeaturesOnDesignationsDBObjects = createFeaturesOnDesignationDBObject(designationId,postDesignationRequest);
  await createFeaturesOnDesignationDB(FeaturesOnDesignationsDBObjects);
  console.log(FeaturesOnDesignationsDBObjects);
  response.send(newDesignation);

}

async function deleteDesignation(request:Request, response:Response){

  const id: string = request.params.id;
  const deletedDesignation:Designation = await deleteDesignationDB(id);
  response.send(deletedDesignation);
}

async function putDesignation(request:Request, response:Response){
  const id:string = request.params.id;
  const body = getRequestSchema.parse(request.body);
 
}

export {
  getDesignation,
  postDesignation,
  getDesignationById,
  getDesignationByName,
  deleteDesignation
};

import { Request, Response } from "express";
import { SevaKendraRequest } from "../../models/sevaKendra/Request.js";
import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";
import {
  createAuditLogDB,
  createServicesOnSevaKendraDB,
  createSevaKendraDB,
  createContactPersonDB,
} from "../../services/database/sevaKendra/create.js";
import {
  createContactPersonDBObject,
  createServicesOnSevaKendraDBObject,
  createSevaKendraAuditLogDBObject,
  createSevaKendraDBObject,
} from "../../DTO/sevaKendra/sevaKendra.js";
import {
  getSevaKendraDB,
  getSevaKendrabyIdDB,
} from "../../services/database/sevaKendra/get.js";
import getRequestSchema from "../getRequest.schema.js";
import { sevaKendraColumnNameMapper } from "../../services/utils/sevaKendra/sevaKendra.js";
import { SevaKendraResponse } from "../../models/sevaKendra/Response.js";

const getSevaKendra = async (request: Request, response: Response) => {
  const query = getRequestSchema.parse(request.query);
  const orderByColumnAndDirection = sevaKendraColumnNameMapper(
    query.orderByColumn,
    query.orderByDirection
  );
  const sevaKendras = await getSevaKendraDB(
    orderByColumnAndDirection,
    query.start,
    query.rows
  );
  response.send(sevaKendras);
};
const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequest = request.body;
  const contactPersonDBObject: ContactPerson =
    createContactPersonDBObject(newSevaKendra);
  const contactPersonId: string = contactPersonDBObject.id;
  await createContactPersonDB(contactPersonDBObject);
  const sevaKendraDBObject: SevaKendra = await createSevaKendraDBObject(
    newSevaKendra,
    contactPersonId
  );
  const sevaKendraId: string = sevaKendraDBObject.id;
  await createSevaKendraDB(sevaKendraDBObject);
  const servicesOnSevaKendraDBObject: ServicesOnSevaKendras[] =
    createServicesOnSevaKendraDBObject(sevaKendraId, newSevaKendra);

  await createServicesOnSevaKendraDB(servicesOnSevaKendraDBObject);

  const auditLogDBObject: SevaKendraAuditLog = createSevaKendraAuditLogDBObject(
    newSevaKendra,
    sevaKendraId
  );
  await createAuditLogDB(auditLogDBObject);
  response.send("Seva Kendra created Successfully");
};
const getSevaKendraById = async (request: Request, response: Response) => {
  const id = request.params.id;
  console.log(id);
  const sevaKendra = await getSevaKendrabyIdDB(id);
  response.send(sevaKendra);
};
const patchSevaKendra = async (request: Request, response: Response) => {};
const putSevaKendra = async (request: Request, response: Response) => {};
const deleteSevaKendra = async (request: Request, response: Response) => {};

export {
  getSevaKendra,
  postSevaKendra,
  putSevaKendra,
  patchSevaKendra,
  deleteSevaKendra,
  getSevaKendraById,
};

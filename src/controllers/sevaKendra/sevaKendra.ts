import { Request, Response } from "express";
import { SevaKendraRequestResponse } from "../../models/sevaKendra/sevaKendra.js";
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
import { getSevaKendraDB } from "../../services/database/sevaKendra/get.js";
import getRequestSchema from "../getRequest.schema.js";

const getSevaKendra = async (request: Request, response: Response) => {
  // const requestBody = getRequestSchema.parse(request);
  // const sevaKendras = await getSevaKendraDB(requestBody);
  // response.send(sevaKendras);
};
const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequestResponse = request.body;
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
  response.send("Mission step 1 SUCCESS");
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
};

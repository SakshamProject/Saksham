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
  getDistrictId,
  getServiceId,
} from "./dummy.js";
import { createContactPersonDB } from "./createContactPersonDB.js";
import { randomUUID } from "crypto";
import {
  createContactPersonDBObject,
  createServicesOnSevaKendraDBObject,
  createSevaKendraAuditLogDBObject,
  createSevaKendraDBObject,
} from "../../DTO/sevaKendra/sevaKendra.js";

const getSevaKendra = async (request: Request, response: Response) => {};
const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequestResponse = request.body;
  const contactPersonDBObject = createContactPersonDBObject(newSevaKendra);
  const contactPerson: ContactPerson = createContactPersonDB(
    contactPersonDBObject
  );
  const sevaKendraDBObject = createSevaKendraDBObject(
    newSevaKendra,
    contactPerson.id
  );
  const sevaKendra: SevaKendra = createSevaKendraDB(sevaKendraDBObject);
  const servicesOnSevaKendraDBObject: ServicesOnSevaKendras[] =
    createServicesOnSevaKendraDBObject(sevaKendra.id, newSevaKendra);

  createServicesOnSevaKendraDB(servicesOnSevaKendraDBObject);

  const auditLogDBObject = createSevaKendraAuditLogDBObject(
    newSevaKendra,
    sevaKendra.id
  );
  createAuditLogDB(auditLogDBObject);
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

import { Request, Response } from "express";
import { SevaKendraRequestResponse } from "../../models/sevaKendra/sevaKendra.js";
import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
} from "@prisma/client";
import {
  createContactPersonDB,
  createSevaKendraDB,
  getCityId,
  getServiceId,
} from "./dummy.js";
import { randomUUID } from "crypto";

const getSevaKendra = async (request: Request, response: Response) => {};
const postSevaKendra = async (request: Request, response: Response) => {
  const newSevaKendra: SevaKendraRequestResponse = request.body;
  const contactPersonId: string = createContactPerson(newSevaKendra);
  const sevaKendraDBObject = transformSevaKendraRequestToDB(
    newSevaKendra,
    contactPersonId
  );
  const sevaKendraId = createSevaKendraDB(sevaKendraDBObject);
  const servicesOnSevaKendraDBObject: ServicesOnSevaKendras[] =
    createServicesOnSevaKendraDBObject(sevaKendraId, newSevaKendra);
};
const patchSevaKendra = async (request: Request, response: Response) => {};
const putSevaKendra = async (request: Request, response: Response) => {};
const deleteSevaKendra = async (request: Request, response: Response) => {};

const transformSevaKendraRequestToDB = (
  sevaKendra: SevaKendraRequestResponse,
  contactPersonId: string
): SevaKendra => {
  const sevaKendraDB: SevaKendra = {
    id: randomUUID(),
    name: sevaKendra.name,
    cityId: getCityId(sevaKendra.city),
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate,
    contactPersonId: contactPersonId,
  };
  return sevaKendraDB;
};

const createContactPerson = (sevaKendra: SevaKendraRequestResponse): string => {
  const contactPersonDBObject: ContactPerson = {
    id: randomUUID(),
    name: sevaKendra.contactPersonName,
    email: sevaKendra.contactPersonEmail,
    phoneNumber1: sevaKendra.contactPersonPhoneNumber1,
    phoneNumber2: sevaKendra.contactPersonPhoneNumber2,
  };
  createContactPersonDB(contactPersonDBObject);
  return contactPersonDBObject.id;
};

const createServicesOnSevaKendraDBObject = (
  sevaKendraId: string,
  sevaKendra: SevaKendraRequestResponse
): ServicesOnSevaKendras[] => {
  let servicesOnSevaKendra: ServicesOnSevaKendras[] = [];

  for (let service in sevaKendra.servicesBySevaKendra) {
    const servicesOnSevaKendraDBObject: ServicesOnSevaKendras = {
      id: randomUUID(),
      sevakendraId: sevaKendraId,
      serviceId: getServiceId(service),
    };
    servicesOnSevaKendra.push(servicesOnSevaKendraDBObject);
  }
  return servicesOnSevaKendra;
};
export {
  getSevaKendra,
  postSevaKendra,
  putSevaKendra,
  patchSevaKendra,
  deleteSevaKendra,
};

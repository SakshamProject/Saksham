import {
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendra,
  SevaKendraAuditLog,
} from "@prisma/client";

const getDistrictId = (cityName: string): string => {
  return "";
};

const createContactPersonDB = (contactPerson: ContactPerson): ContactPerson => {
  const createdContactPerson: ContactPerson = {
    email: "",
    id: "",
    name: "",
    phoneNumber1: "",
    phoneNumber2: "",
  };
  return createdContactPerson;
};
const createSevaKendraDB = (sevaKendra: SevaKendra): SevaKendra => {
  const createdSevaKendra: SevaKendra = {};
  return createdSevaKendra;
};
const createServicesOnSevaKendraDB = (
  sevaKendraServices: ServicesOnSevaKendras[]
) => {};
const createAuditLogDB = (auditLog: SevaKendraAuditLog) => {};

const getServiceId = (serviceName: string): string => {
  return "";
};
export {
  getDistrictId,
  createContactPersonDB,
  createSevaKendraDB,
  createServicesOnSevaKendraDB,
  createAuditLogDB,
  getServiceId,
};

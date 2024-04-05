import {
  SevaKendra,
  SevaKendraRequestSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { sevaKendraDefaults } from "../../types/sevaKendra/sevaKendraDefaults.js";

const createSevaKendraDBObject = (
  sevaKendra: SevaKendraRequestSchemaType,
  createdBy: string
) => {
  const sevaKendraDBObject: SevaKendra = {
    name: sevaKendra.name,
    district: {
      connect: {
        id: sevaKendra.districtId,
      },
    },
    address: sevaKendra.address,
    mobileNumber: sevaKendra.mobileNumber,
    landLineNumber: sevaKendra.landLineNumber,
    startDate: sevaKendra.startDate,
    contactPerson: {
      create: {
        name: sevaKendra.contactPerson.name,
        email: sevaKendra.contactPerson.email,
        phoneNumber1: sevaKendra.contactPerson.phoneNumber1,
        phoneNumber2: sevaKendra.contactPerson.phoneNumber2,
      },
    },
    services: {
      createMany: {
        data: sevaKendra.servicesBySevaKendra,
        skipDuplicates: true,
      },
    },
    SevaKendraAuditLog: {
      create: {
        status: AuditLogStatusEnum.ACTIVE,
        date: sevaKendraDefaults.date,
        description: sevaKendraDefaults.description,
      },
    },
    createdBy: createdBy,
  };
  return sevaKendraDBObject;
};

export { createSevaKendraDBObject };

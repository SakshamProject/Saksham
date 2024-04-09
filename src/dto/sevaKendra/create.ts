import {
  SevaKendra,
  SevaKendraRequestSchemaType,
  filterSevaKendraSchemaType,
} from "../../types/sevaKendra/sevaKendra.js";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { sevaKendraDefaults } from "../../types/sevaKendra/sevaKendraDefaults.js";
import { generateSevaKendraFilter } from "../../services/database/utils/sevaKendra/filterMapper.js";

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
    startDate: sevaKendra.startDate || new Date().toISOString(),
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
        date: sevaKendraDefaults.date,
        description: sevaKendraDefaults.description,
        status: AuditLogStatusEnum.ACTIVE,
      },
    },
    createdBy: createdBy,
    createdAt: new Date().toISOString(),
  };
  return sevaKendraDBObject;
};

const createSevaKendraFilterInputObject = (
  sevaKendraFilter: filterSevaKendraSchemaType
): Prisma.SevaKendraWhereInput => {
  const sevaKendraWhereInput = generateSevaKendraFilter(sevaKendraFilter);
  return sevaKendraWhereInput;
};

export { createSevaKendraDBObject, createSevaKendraFilterInputObject };

import { z } from "zod";
import inputFieldSchema, {
  auditLogSchema,
  dateSchema,
  emailSchema,
  filterOperationsEnum,
  landLineNumberSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { Prisma } from "@prisma/client";
import { SevaKendraColumnNamesEnum } from "./sevaKendraDefaults.js";
import { sortOrderEnum } from "../getRequestSchema.js";
import {AuditLogStatusEnum} from "@prisma/client";

const SevaKendraColumnNameSchema = z
  .nativeEnum(SevaKendraColumnNamesEnum)
  .optional();

const SevaKendraRequestSchema = z.object({
  name: inputFieldSchema.toUpperCase(),
  districtId: uuidSchema,
  address: z.string(),
  landLineNumber: landLineNumberSchema,
  mobileNumber: phoneNumberSchema,
  startDate: dateSchema.optional(),
  contactPerson: z.object({
    id: uuidSchema.optional(),
    name: inputFieldSchema.toUpperCase(),
    email: emailSchema,
    phoneNumber1: phoneNumberSchema,
    phoneNumber2: phoneNumberSchema,
  }),
  servicesBySevaKendra: z
    .object({
      serviceId: uuidSchema,
    })
    .array(),
});

const SevaKendraUpdateRequestSchema = z.object({
  id: uuidSchema,
  name: inputFieldSchema.toUpperCase(),
  districtId: uuidSchema,
  address: z.string(),
  landLineNumber: landLineNumberSchema,
  mobileNumber: phoneNumberSchema,
  startDate: dateSchema.optional(),
  currentStatus: z.nativeEnum(AuditLogStatusEnum),
  contactPerson: z.object({
    id: uuidSchema,
    name: inputFieldSchema.toUpperCase(),
    email: emailSchema,
    phoneNumber1: phoneNumberSchema,
    phoneNumber2: phoneNumberSchema,
  }),
  services: z
    .object({
      serviceId: uuidSchema,
    })
    .array(),
  auditLog: auditLogSchema,
});
type SevaKendraUpdateRequestSchemaType = z.infer<
  typeof SevaKendraUpdateRequestSchema
>;

const sevaKendraFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(SevaKendraColumnNamesEnum),
    value: z.string(),
  })
  .array();

const getSevaKendraSchema = z.object({
  filters: sevaKendraFilter.optional(),
  pagination: z
    .object({
      rows: z.number().positive(),
      start: z
        .number()
        .positive()
        .transform((number) => number - 1),
    })
    .optional(),
  searchText: z.string().optional(),
  sorting: z
    .object({
      orderByColumn: z.nativeEnum(SevaKendraColumnNamesEnum),
      sortOrder: z.nativeEnum(sortOrderEnum),
    })
    .optional(),
});


type SevaKendraFilterType = z.infer<typeof sevaKendraFilter>;
type GetSevaKendraSchemaType = z.infer<typeof getSevaKendraSchema>;
type SevaKendraRequestSchemaType = z.infer<typeof SevaKendraRequestSchema>;
type SevaKendra = Prisma.SevaKendraCreateInput;
type SevaKendraUpdate = Prisma.SevaKendraUpdateInput;
type ContactPerson = Prisma.ContactPersonUpdateInput;
type ServicesOnSevaKendras = Prisma.ServicesOnSevaKendrasCreateInput;
type SevaKendraAuditLog = Prisma.SevaKendraAuditLogCreateInput;
type SevaKendraWhere = Prisma.SevaKendraWhereInput;
type SevaKendraServices = Prisma.SevaKendraGetPayload<{
  select: {
    services: {
      select: {
        serviceId: true;
      };
    };
  };
}>;
type SevaKendraServicesList = {
  servicesToCreate: ServicesIds[];
  servicesToDelete: string[];
};
type ServicesIds = { serviceId: string };
export {
  SevaKendraColumnNameSchema,
  SevaKendraUpdateRequestSchema,
  getSevaKendraSchema,
  SevaKendraWhere,
  SevaKendraFilterType,
  GetSevaKendraSchemaType,
  ServicesIds,
  SevaKendraUpdateRequestSchemaType,
  SevaKendraServices,
  SevaKendraRequestSchemaType,
  SevaKendra,
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendraAuditLog,
  SevaKendraUpdate,
  SevaKendraServicesList,
};
export default SevaKendraRequestSchema;

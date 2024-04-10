import { z } from "zod";
import inputFieldSchema, {
  emailSchema,
  filter,
  landLineNumberSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import { SevaKendraColumnNamesEnum } from "./sevaKendraDefaults.js";

const SevaKendraColumnNameSchema = z
  .nativeEnum(SevaKendraColumnNamesEnum)
  .optional();

const SevaKendraRequestSchema = z.object({
  name: inputFieldSchema.toUpperCase(),
  districtId: uuidSchema,
  address: z.string(),
  landLineNumber: landLineNumberSchema,
  mobileNumber: phoneNumberSchema,
  startDate: z.string().datetime().optional(),
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
  auditLog: z
    .object({
      id: uuidSchema.optional(),
      status: z.nativeEnum(AuditLogStatusEnum),
      date: z.string().datetime(),
      description: inputFieldSchema,
    })
    .optional(),
});

const SevaKendraUpdateRequestSchema = z.object({
  id: uuidSchema,
  name: inputFieldSchema.toUpperCase(),
  districtId: uuidSchema,
  address: z.string(),
  landLineNumber: landLineNumberSchema,
  mobileNumber: phoneNumberSchema,
  startDate: z.string().datetime().optional(),
  contactPerson: z.object({
    id: uuidSchema,
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
  auditLog: z
    .object({
      id: uuidSchema.optional(),
      status: z.nativeEnum(AuditLogStatusEnum),
      date: z.string().datetime(),
      description: inputFieldSchema,
    })
    .array(),
});
type SevaKendraUpdateRequestSchemaType = z.infer<
  typeof SevaKendraUpdateRequestSchema
>;
const filterSevaKendraSchema = z.object({
  sevaKendraName: filter.optional(),
  state: filter.optional(),
  district: filter.optional(),
  contactPersonName: filter.optional(),
  contactPersonNumber: filter.optional(),
});

type filterSevaKendraSchemaType = z.infer<typeof filterSevaKendraSchema>;

type SevaKendraRequestSchemaType = z.infer<typeof SevaKendraRequestSchema>;
type SevaKendra = Prisma.SevaKendraCreateInput;
type SevaKendraUpdate = Prisma.SevaKendraUpdateInput;
type ContactPerson = Prisma.ContactPersonUpdateInput;
type ServicesOnSevaKendras = Prisma.ServicesOnSevaKendrasCreateInput;
type SevaKendraAuditLog = Prisma.SevaKendraAuditLogCreateInput;
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
  filterSevaKendraSchema,
  filterSevaKendraSchemaType,
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

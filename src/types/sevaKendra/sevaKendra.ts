import { z } from "zod";
import inputFieldSchema, {
  emailSchema,
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
  startDate: z.string().optional(),
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
      date: z.date(),
      description: inputFieldSchema,
    })
    .optional(),
});
type SevaKendraRequestSchemaType = z.infer<typeof SevaKendraRequestSchema>;
type SevaKendra = Prisma.SevaKendraCreateInput;
type SevaKendraUpdate = Prisma.SevaKendraUpdateInput;
type ContactPerson = Prisma.ContactPersonUpdateInput;
type ServicesOnSevaKendras = Prisma.ServicesOnSevaKendrasCreateInput;
type SevaKendraAuditLog = Prisma.SevaKendraAuditLogCreateInput;

export {
  SevaKendraColumnNameSchema,
  SevaKendraRequestSchemaType,
  SevaKendra,
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendraAuditLog,
  SevaKendraUpdate,
};
export default SevaKendraRequestSchema;

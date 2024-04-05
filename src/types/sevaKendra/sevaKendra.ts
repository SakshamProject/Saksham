import { z } from "zod";
import inputFieldSchema, {
  emailSchema,
  landLineNumberSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";

const SevaKendraRequestSchema = z.object({
  name: inputFieldSchema.toUpperCase(),
  districtId: uuidSchema,
  address: z.string(),
  landLineNumber: landLineNumberSchema,
  mobileNumber: phoneNumberSchema,
  startDate: z.date().optional(),
  contactPerson: z.object({
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
      status: z.nativeEnum(AuditLogStatusEnum),
      date: z.date(),
      description: inputFieldSchema,
    })
    .optional(),
});
type SevaKendraRequestSchemaType = z.infer<typeof SevaKendraRequestSchema>;
type SevaKendra = Prisma.SevaKendraCreateInput;
type ContactPerson = Prisma.ContactPersonCreateInput;
type ServicesOnSevaKendras = Prisma.ServicesOnSevaKendrasCreateInput;
type SevaKendraAuditLog = Prisma.SevaKendraAuditLogCreateInput;

export {
  SevaKendraRequestSchemaType,
  SevaKendra,
  ContactPerson,
  ServicesOnSevaKendras,
  SevaKendraAuditLog,
};
export default SevaKendraRequestSchema;

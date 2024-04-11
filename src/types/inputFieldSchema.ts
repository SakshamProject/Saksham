import { z } from "zod";
import defaults from "../defaults.js";
import { phoneNumberRegex } from "./regex.js";
import isISODate from "is-iso-date";
import { AuditLogStatusEnum } from "@prisma/client";

const inputFieldSchema = z
  .string()
  .min(defaults.minFieldLength)
  .trim()
  .regex(
    /^[\w\s.-]+$/gm,
    "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]"
  );

enum filterOperationsEnum {
  EQUALS = "equals",
  NOTEQUALS = "notEquals",
  STARTSWITH = "startsWith",
  BEGINSWITH = "endsWith",
}
const filter = z.object({
  operation: z.nativeEnum(filterOperationsEnum),
  value: z.string(),
});

const phoneNumberSchema = z.string().length(10).regex(phoneNumberRegex);
const emailSchema = z.string().email();
const landLineNumberSchema = z.string().min(6).regex(phoneNumberRegex);
const uuidSchema = z.string().uuid();
const queryParamsSchema = z.string().optional();
const dateSchema = z
  .string()
  .refine(isISODate, { message: "Not a valid ISO 8601 string date " });

const auditLogSchema = z.object({
  id: uuidSchema.optional(),
  status: z.nativeEnum(AuditLogStatusEnum),
  date: z.string().datetime(),
  description: inputFieldSchema,
});
export {
  dateSchema,
  auditLogSchema,
  queryParamsSchema,
  filter,
  filterOperationsEnum,
  inputFieldSchema,
  phoneNumberSchema,
  emailSchema,
  landLineNumberSchema,
  uuidSchema,
};
export default inputFieldSchema;
import { z } from "zod";
import defaults from "../defaults.js";
import { AuditLogStatusEnum } from "@prisma/client";
import isISODate from "is-iso-date";

const inputFieldSchema = z
  .string()
  .min(defaults.minFieldLength)
  .trim()
  .regex(
    /^[\w\s.-]+$/gm,
    "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]"
  );
export const queryParamsSchema = z.string().optional();
export const auditLogSchema = z
  .object({
    id: z.string().optional(),
    status: z.nativeEnum(AuditLogStatusEnum),
    date: z.string().refine(isISODate, {"message": "Invalid ISO 8601 Date Time"}),
    description: inputFieldSchema,
  });

export default inputFieldSchema;

import {z} from "zod";
import { GenderEnum, AuditLogStatusEnum } from "@prisma/client";
import isISODate from "is-iso-date";
import {emailSchema, phoneNumberSchema, uuidSchema} from "../inputFieldSchema.js";
import {specialCharsRegex} from "../regex.js";


const usersSchema = z.object({
    sevaKendraId: uuidSchema,
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.nativeEnum(GenderEnum),
    dateOfBirth: z.string().refine(isISODate, { message: "Not a valid ISO 8601 string date "}),
    designationId: z.string().uuid(),
    mail: emailSchema,
    contactNumber: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
    loginId: phoneNumberSchema,
    password: z.string().regex(specialCharsRegex),
    // audit log
    status: z.nativeEnum(AuditLogStatusEnum),
    date: z.string().refine(isISODate, { message: "Not a valid ISO 8601 string date "}),


});

export default usersSchema;
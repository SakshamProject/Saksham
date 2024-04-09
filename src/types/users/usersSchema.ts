import {z} from "zod";
import { GenderEnum, AuditLogStatusEnum } from "@prisma/client";
import {dateSchema, emailSchema, phoneNumberSchema, uuidSchema} from "../inputFieldSchema.js";
import {specialCharsRegex} from "../regex.js";


const usersSchema = z.object({
    sevaKendraId: uuidSchema,
    userId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.nativeEnum(GenderEnum),
    dateOfBirth: dateSchema,
    designationId: z.string().uuid(),
    mail: emailSchema,
    contactNumber: phoneNumberSchema,
    whatsappNumber: phoneNumberSchema,
    loginId: phoneNumberSchema,
    password: z.string().regex(specialCharsRegex),
    // audit log
    status: z.nativeEnum(AuditLogStatusEnum),
    date: dateSchema,
});
const userRequestType = z.infer<typeof usersSchema>;

export default usersSchema;
export { userRequestType };
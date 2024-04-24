import { z } from "zod";
import inputFieldSchema, {
  emailSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { BloodGroupEnum, GenderEnum } from "@prisma/client";

const personalDetailsRequestSchema = z.object({
  password: inputFieldSchema,
  firstName: inputFieldSchema,
  lastName: inputFieldSchema,
  divyangId: inputFieldSchema,
  picture: inputFieldSchema.optional(),
  bloodGroup: z.nativeEnum(BloodGroupEnum),
  gender: z.nativeEnum(GenderEnum), // is optional in sheet
  dateOfBirth: z.string().datetime(),
  age: z.number().optional(),
  mailId: emailSchema,
  mobileNumber: phoneNumberSchema,
  fatherName: inputFieldSchema,
  motherName: inputFieldSchema,
  isMarried: z.boolean().optional(),
  spouseName: inputFieldSchema.optional(),
  spouseNumber: phoneNumberSchema.optional(),
  religion: inputFieldSchema,
  communityCategoryId: uuidSchema,
  community: inputFieldSchema,
  extraCurricularActivity: inputFieldSchema.optional(),
});
type PersonalDetails = z.infer<typeof personalDetailsRequestSchema>;
export { personalDetailsRequestSchema, PersonalDetails };

import { z } from "zod";
import inputFieldSchema, {
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  userNameSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { BloodGroupEnum, GenderEnum } from "@prisma/client";

const educationQualificationsSchema = z.object({
  educationQualificationTypeId: uuidSchema,
  educationQualificationId: uuidSchema.optional(),
});
type EducationQualificationsType = z.infer<
  typeof educationQualificationsSchema
>;
const personalDetailsRequestSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
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
  educationQualifications: educationQualificationsSchema.array(),
});

const updatePersonalDetailsRequestSchema = z.object({
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
  educationQualifications: educationQualificationsSchema.array(),
});

type PersonalDetails = z.infer<typeof personalDetailsRequestSchema>;
type UpdatePersonalDetails = z.infer<typeof updatePersonalDetailsRequestSchema>;

export {
  personalDetailsRequestSchema,
  PersonalDetails,
  UpdatePersonalDetails,
  updatePersonalDetailsRequestSchema,
  EducationQualificationsType,
  educationQualificationsSchema,
};

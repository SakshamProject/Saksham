import { z } from "zod";
import inputFieldSchema, { uuidSchema } from "../inputFieldSchema.js";
import { CertificateIssueAuthorityEnum, Prisma } from "@prisma/client";
import { EducationQualificationsSchemaType } from "./personalDetailsSchema.js";

const disabilityOfDivyangSchema = z.object({
  id: uuidSchema.optional(),
  disabilityTypeId: uuidSchema,
  disabilitySubTypeId: uuidSchema.optional(),
  isDisabilitySinceBirth: z
    .string()
    .transform((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      throw new Error("Invalid boolean string");
    })
    .optional(),
  disabilitySince: z.string().datetime().optional(),
  disabilityArea: z.string().optional(),
  disabilityPercentage: z.coerce.number().min(0).max(100).optional(),
  disabilityDueTo: z.string(),
  certificateIssueAuthority: z
    .nativeEnum(CertificateIssueAuthorityEnum)
    .optional(),
  disabilityCardFileName: z.string().optional(), // url
  dateOfIssue: z.string().datetime().optional(),
});
type DisabilityOfDivyang = z.infer<typeof disabilityOfDivyangSchema>;
const disabiltyDetailsRequestSchema = z
  .object({
    disabilities: disabilityOfDivyangSchema.array(),
    districtCode: z.string(),
    stateCode: z.string(),
    identityCardNumber: z.string(),
    UDIDCardFile: z.string(),
    UDIDEnrollmentNumber: z.string().optional(),
    UDIDCardNumber: z.string().optional(),
    files: z.object({ UDIDCardFileName: z.string().nullable() }),
  })
  .refine((data) => {
    return (
      data.UDIDCardNumber !== undefined ||
      data.UDIDEnrollmentNumber !== undefined
    );
  }, "UDIDCardNumber or UDIDEnrollmentNumber must be present");

type DisabilityDetails = z.infer<typeof disabiltyDetailsRequestSchema>;

type DisabilityOfDivyangList = {
  disabilitiesToCreate: DisabilityOfDivyang[];
  disabilitiesToDelete: string[];
  disabilitiesToUpdate: DisabilityOfDivyang[];
};
type EducationQualificationOfDivyangList = {
  educationQualificationsToCreate: EducationQualificationsSchemaType[];
  educationQualificationsToDelete: string[];
  educationQualificationsToUpdate: EducationQualificationsSchemaType[];
};
export {
  disabiltyDetailsRequestSchema,
  EducationQualificationOfDivyangList,
  disabilityOfDivyangSchema,
  DisabilityDetails,
  DisabilityOfDivyang,
  DisabilityOfDivyangList,
};

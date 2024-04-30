import { z } from "zod";
import inputFieldSchema, { uuidSchema } from "../inputFieldSchema.js";
import { CertificateIssueAuthorityEnum, Prisma } from "@prisma/client";
import { EducationQualificationsSchemaType } from "./personalDetailsSchema.js";

const disabilityOfDivyangSchema = z.object({
  id: uuidSchema.optional(),
  disabilityTypeId: uuidSchema,
  disabilitySubTypeId: uuidSchema.optional(),
  isDisabilitySinceBirth: z.boolean().optional(),
  disabilitySince: z.string().datetime().optional(),
  disabilityArea: z.string().optional(),
  disabilityPercentage: z.number().min(0).max(100).optional(),
  disabilityDueTo: z.string(),
  certificateIssueAuthority: z
    .nativeEnum(CertificateIssueAuthorityEnum)
    .optional(),
  disabilityCardUrl: z.string().optional(), // url
});
type DisabilityOfDivyang = z.infer<typeof disabilityOfDivyangSchema>;
const disabiltyDetailsRequestSchema = z.object({
  disabilities: disabilityOfDivyangSchema.array(),
  districtCode: z.string(),
  stateCode: z.string(),
  identityCardNumber: z.string(),
  UDIDCardNumber: z.string(),
  UDIDCardUrl: z.string(),
  UDIDEnrollmentNumber: z.string(),
});

// .refine((data) => {
//   if (data.isDisabilitySinceBirth) {
//     return data.disabilitySince === null;
//   } else {
//     return (
//       data.udidCardNumber !== undefined &&
//       data.udidEnrollmentNumber !== undefined
//     );
//   }
// }
// );
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

import { z } from "zod";
import inputFieldSchema, { uuidSchema } from "../inputFieldSchema.js";
import { CertificateIssueAuthorityEnum, Prisma } from "@prisma/client";

const disabilityOfDivyangSchema = z.object({
  divyangId: uuidSchema,
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
  identityCardNumber: z.string().length(64),
  udidCardNumber: z.string().length(64),
  udidCardUrl: z.string(),
  udidEnrollmentNumber: z.string().length(64),
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
  servicesToCreate: string[];
  servicesToDelete: string[];
};

export {
  disabiltyDetailsRequestSchema,
  disabilityOfDivyangSchema,
  DisabilityDetails,
  DisabilityOfDivyang,
  DisabilityOfDivyangList,
};

import { z } from 'zod';
import inputFieldSchema from '../inputFieldSchema.js';

const IdProofUploadsRequestSchema = z.object({
  voterIdNumber: inputFieldSchema.optional(),
  panCardNumber: z
    .string()
    .length(10)
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN card number format')
    .optional(),
  drivingLicenseNumber: z.string().max(64).optional(),
  rationCardNumber: z.string().max(64).optional(),
  aadharCardNumber: z
    .string()
    .length(12)
    .regex(/^\d{12}$/, 'Invalid Aadhaar number format')
    .optional(),
  pensionCardNumber: z.string().max(64).optional(),
  medicalInsuranceNumber: z.string().max(64).optional(),
  disabilitySchemeNumber: z.string().max(64).optional(),
  BPL_OR_APL_Number: z.string().max(64).optional(),
  // voterIdFile: z.string().optional(),
  // panCardFile: z.string().optional(),
  // drivingLicenseFile: z.string().optional(),
  // rationCardFile: z.string().optional(),
  // aadharCardFile: z.string().optional(),
  // pensionCardFile: z.string().optional(),
  // medicalInsuranceCardFile: z.string().optional(),
  // disabilitySchemeCardFile: z.string().optional(),
  // BPL_OR_APL_CardFile: z.string().optional(),
  fileNames: z.object({
    voterIdFileName: z.string().nullable().optional(),
    panCardFileName: z.string().nullable().optional(),
    drivingLicenseFileName: z.string().nullable().optional(),
    rationCardFileName: z.string().nullable().optional(),
    aadharCardFileName: z.string().nullable().optional(),
    pensionCardFileName: z.string().nullable().optional(),
    medicalInsuranceCardFileName: z.string().nullable().optional(),
    disabilitySchemeCardFileName: z.string().nullable().optional(),
    BPL_OR_APL_CardFileName: z.string().nullable().optional(),
  }),
});
// .refine((val) => {
//   const fileNames = val.fileNames;
//   const fileNameFields = [
//     fileNames.voterIdFileName,
//     fileNames.panCardFileName,
//     fileNames.drivingLicenseFileName,
//     fileNames.rationCardFileName,
//     fileNames.aadharCardFileName,
//     fileNames.pensionCardFileName,
//     fileNames.medicalInsuranceCardFileName,
//     fileNames.disabilitySchemeCardFileName,
//     fileNames.BPL_OR_APL_CardFileName,
//   ];
//   return fileNameFields.filter((v) => v !== undefined).length >= 2;
// }, "At least two file names must be present");

type IdProofUploads = z.infer<typeof IdProofUploadsRequestSchema>;

export { IdProofUploadsRequestSchema, IdProofUploads };

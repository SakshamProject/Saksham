import { Prisma } from "@prisma/client";
import {
  getAadharCardDBObject,
  getBplOrAplCardDBObject,
  getDisabilitySchemeCardDBObject,
  getDrivingLicenseDBObject,
  getMedicalInsuranceCardDBObject,
  getPanCardDBObject,
  getPensionCardDBObject,
  getRationCardDBObject,
  getVoterIdDBObject,
} from "./IdProofDTO.js";

export enum Folders {
  PROFILE_PHOTO = "profilePhoto",
  UDID_CARD = "udidCard",
  DISABILITY_CARDS = "disabilityCards",
  VOTER_ID = "voterId",
  PAN_CARD = "panCard",
  DRIVING_LICENSE = "drivingLicense",
  RATION_CARD = "rationCard",
  AADHAR_CARD = "aadharCard",
  PENSION_CARD = "pensionCard",
  MEDICAL_INSURANCE_CARD = "medicalInsuranceCard",
  DISABILITY_SCHEME_CARD = "disabilitySchemeCard",
  BPL_OR_APL_Card = "bplOrAplCard",
  DEFAULT = "defaultDump",
}

export const IdProofFileNameToFolderMap = new Map<string, Folders>([
  ["voterIdFileName", Folders.VOTER_ID],
  ["panCardFileName", Folders.PAN_CARD],
  ["drivingLicenseFileName", Folders.DRIVING_LICENSE],
  ["rationCardFileName", Folders.RATION_CARD],
  ["aadharCardFileName", Folders.AADHAR_CARD],
  ["pensionCardFileName", Folders.PENSION_CARD],
  ["medicalInsuranceCardFileName", Folders.MEDICAL_INSURANCE_CARD],
  ["disabilitySchemeCardFileName", Folders.DISABILITY_SCHEME_CARD],
  ["BPL_OR_APL_CardFileName", Folders.BPL_OR_APL_Card],
]);

export const IdProofFolderToFunctionMap = new Map<
  Folders,
  (
    fileName: string | null,
    key: string | null
  ) => Prisma.DivyangDetailsUpdateInput
>([
  [Folders.VOTER_ID, getVoterIdDBObject],
  [Folders.PAN_CARD, getPanCardDBObject],
  [Folders.DRIVING_LICENSE, getDrivingLicenseDBObject],
  [Folders.RATION_CARD, getRationCardDBObject],
  [Folders.AADHAR_CARD, getAadharCardDBObject],
  [Folders.PENSION_CARD, getPensionCardDBObject],
  [Folders.MEDICAL_INSURANCE_CARD, getMedicalInsuranceCardDBObject],
  [Folders.DISABILITY_SCHEME_CARD, getDisabilitySchemeCardDBObject],
  [Folders.BPL_OR_APL_Card, getBplOrAplCardDBObject],
]);

export const divyangKeysSet: Set<string> = new Set([
  "profilePhotoKey",
  "voterIdKey",
  "panCardKey",
  "drivingLicenseKey",
  "rationCardKey",
  "aadharCardKey",
  "pensionCardKey",
  "medicalInsuranceCardKey",
  "disabilitySchemeCardKey",
  "BPL_OR_APL_CardKey",
  "UDIDCardKey",
]);

export const IdProofKeyToFolderMap = new Map<string, Folders>([
  ["voterIdKey", Folders.VOTER_ID],
  ["panCardKey", Folders.PAN_CARD],
  ["drivingLicenseKey", Folders.DRIVING_LICENSE],
  ["rationCardKey", Folders.RATION_CARD],
  ["aadharCardKey", Folders.AADHAR_CARD],
  ["pensionCardKey", Folders.PENSION_CARD],
  ["medicalInsuranceCardKey", Folders.MEDICAL_INSURANCE_CARD],
  ["disabilitySchemeCardKey", Folders.DISABILITY_SCHEME_CARD],
  ["BPL_OR_APL_CardKey", Folders.BPL_OR_APL_Card],
  ["profilePhotoKey", Folders.PROFILE_PHOTO],
  ["UDIDCardKey", Folders.UDID_CARD],
]);

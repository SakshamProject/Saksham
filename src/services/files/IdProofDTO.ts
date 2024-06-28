import { Prisma } from "@prisma/client";
import { Folders, IdProofFolderToFunctionMap } from "./constants.js";

export function getVoterIdDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    voterIdFileName: fileName,
    voterIdKey: key,
  };
}
export function getPanCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    panCardFileName: fileName,
    panCardKey: key,
  };
}
export function getDrivingLicenseDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    drivingLicenseFileName: fileName,
    drivingLicenseKey: key,
  };
}
export function getRationCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    rationCardFileName: fileName,
    rationCardKey: key,
  };
}
export function getAadharCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    aadharCardFileName: fileName,
    aadharCardKey: key,
  };
}

export function getPensionCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    pensionCardFileName: fileName,
    pensionCardKey: key,
  };
}

export function getMedicalInsuranceCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    medicalInsuranceCardFileName: fileName,
    medicalInsuranceCardKey: key,
  };
}

export function getDisabilitySchemeCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    disabilitySchemeCardFileName: fileName,
    disabilitySchemeCardKey: key,
  };
}
export function getBplOrAplCardDBObject(
  fileName: string | null,
  key: string | null
): Prisma.DivyangDetailsUpdateInput {
  return {
    BPL_OR_APL_CardFileName: fileName,
    BPL_OR_APL_CardKey: key,
  };
}

export const getIDProofUploadsDBObject = (
  folder: Folders,
  fileName: string,
  key: string
) => {
  const getDBObject = IdProofFolderToFunctionMap.get(folder);
  if (getDBObject) {
    return getDBObject(fileName, key);
  } else {
    return {};
  }
};

import { Prisma } from '@prisma/client';
import { DisabilityOfDivyang } from '../../../types/divyangDetails/disabilityDetailsSchema.js';

const updateDisabilityOfDivyangDBObject = (disability: DisabilityOfDivyang) => {
  const newDisability: Prisma.DisabilityOfDivyangUncheckedCreateInput = {
    disabilityTypeId: disability.disabilityTypeId,
    divyangId: disability.divyangId,
    certificateIssueAuthority: disability.certificateIssueAuthority,
    dateOfIssue: disability.dateOfIssue,
    disabilityArea: disability.disabilityArea,
    disabilityDueTo: disability.disabilityDueTo,
    disabilityPercentage: disability.disabilityPercentage,
    disabilitySince: disability.disabilitySince,
    isDisabilitySinceBirth: disability.isDisabilitySinceBirth,
    disabilitySubTypeId: disability.disabilitySubTypeId,
  };

  return newDisability;
};

export { updateDisabilityOfDivyangDBObject };

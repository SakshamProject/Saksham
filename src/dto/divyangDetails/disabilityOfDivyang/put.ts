import { Prisma } from '@prisma/client';
import { DisabilityOfDivyang } from '../../../types/divyangDetails/disabilityDetailsSchema.js';

const updateDisabilityOfDivyangDBObject = (disability: DisabilityOfDivyang) => {
  const newDisability: Prisma.DisabilityOfDivyangCreateInput = {
    disabilityType: {
      connect: { id: disability.disabilityTypeId },
    },
    divyang: {
      connect: {
        id: disability.divyangId,
      },
    },
    certificateIssueAuthority: disability.certificateIssueAuthority,
    dateOfIssue: disability.dateOfIssue,
    disabilityArea: disability.disabilityArea,
    disabilityDueTo: disability.disabilityDueTo,
    disabilityPercentage: disability.disabilityPercentage,
    disabilitySince: disability.disabilitySince,
    isDisabilitySinceBirth: disability.isDisabilitySinceBirth,
  };
  if (disability.disabilitySubTypeId) {
    newDisability.disabilitySubType = {
      connect: { id: disability.disabilitySubTypeId },
    };
  }
  return newDisability;
};

export { updateDisabilityOfDivyangDBObject };

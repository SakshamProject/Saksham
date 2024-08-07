import { Prisma } from '@prisma/client';
import { updateDivyangDetails } from '../../../types/divyangDetails/divyangDetailsSchema.js';
import throwDatabaseError from '../utils/errorHandler.js';
import { DisabilityOfDivyang } from '../../../types/divyangDetails/disabilityDetailsSchema.js';
import { EducationQualificationsSchemaType } from '../../../types/divyangDetails/personalDetailsSchema.js';
import log from '../../logger/logger.js';

const updateDivyangDetailsDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangDetails: updateDivyangDetails,
  id: string
) => {
  try {
    const updatedDivyangDetails = await prismaTransaction.divyangDetails.update(
      {
        where: {
          id,
        },
        data: divyangDetails,
      }
    );
    return updatedDivyangDetails;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
const updateDisabilityOfDivyangDB = async (
  prismaTrasaction: Prisma.TransactionClient,
  disabilities: DisabilityOfDivyang,
  id: string,
  divyangId: string
) => {
  try {
    let data: Prisma.DisabilityOfDivyangUpdateInput = {
      divyang: {
        connect: { id: divyangId },
      },
      disabilityType: {
        connect: { id: disabilities.disabilityTypeId },
      },
      disabilityDueTo: disabilities.disabilityDueTo,

      isDisabilitySinceBirth: disabilities.isDisabilitySinceBirth,
      disabilitySince: disabilities.disabilitySince,
      disabilityArea: disabilities.disabilityArea,
      disabilityPercentage: disabilities.disabilityPercentage,
      certificateIssueAuthority: disabilities.certificateIssueAuthority,
      // disabilityCardUrl: disabilities.disabilityCardUrl,
    };
    if (disabilities.disabilitySubTypeId) {
      data = {
        ...data,
        disabilitySubType: {
          connect: { id: disabilities.disabilitySubTypeId },
        },
      };
    }
    const updatedDisabilityOfDivyang =
      await prismaTrasaction.disabilityOfDivyang.update({
        where: {
          id: id,
        },
        data: data,
      });
    return updatedDisabilityOfDivyang;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const updateEducationQualificationOfDivyangDB = async (
  prismaTransaction: Prisma.TransactionClient,
  educationQualification: EducationQualificationsSchemaType,
  id: string,
  divyangId: string
) => {
  try {
    const updatedEducationQualificationOfDivyang =
      await prismaTransaction.divyangEducationalQualification.update({
        where: { id: id },
        data: {
          divyang: {
            connect: { id: divyangId },
          },
          educationQualification: {
            connect: { id: educationQualification.educationQualificationId },
          },
          educationQualificationType: {
            connect: {
              id: educationQualification.educationQualificationTypeId,
            },
          },
        },
      });
    return updatedEducationQualificationOfDivyang;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

async function divayangDetailsUpdateFileKeysDB(
  prisma: Prisma.TransactionClient,
  personId: string,
  data: Prisma.DivyangDetailsUpdateInput
) {
  try {
    const result = await prisma.divyangDetails.update({
      data: data,
      where: {
        personId: personId,
      },
      include: {
        person: true,
      },
    });
    return result;
  } catch (error) {
    throwDatabaseError(error);
  }
}

async function updateDivyangProfileKeyDB(
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  data: Prisma.DivyangDetailsUpdateInput
) {
  try {
    const result = await prismaTransaction.divyangDetails.update({
      where: {
        personId: personId,
      },
      data: data,
    });
    return result;
  } catch (error) {
    throwDatabaseError(error);
  }
}

async function updateUDIDCardKeyDB(
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  data: Prisma.DivyangDetailsUpdateInput
) {
  try {
    const result = await prismaTransaction.divyangDetails.update({
      data,
      where: {
        personId,
      },
    });
    return result;
  } catch (error) {
    throwDatabaseError(error);
  }
}

async function updateDisabilityDetailsCardKey(
  prisma: Prisma.TransactionClient,
  disabilityOfDivyangId: string,
  data: Prisma.DisabilityOfDivyangUpdateInput
) {
  try {
    const result = await prisma.disabilityOfDivyang.update({
      data,
      where: {
        id: disabilityOfDivyangId,
      },
    });
    return result;
  } catch (error) {
    throwDatabaseError(error);
  }
}

async function saveDisabilityDetailsCardKey(
  prisma: Prisma.TransactionClient,
  disabilityOfDivyangId: string,
  data: Prisma.DisabilityOfDivyangUpdateInput
) {
  try {
    const result = await prisma.disabilityOfDivyang.update({
      data,
      where: {
        id: disabilityOfDivyangId,
      },
    });
    return result;
  } catch (error) {
    throwDatabaseError(error);
  }
}
const updateDivyangDetailsByPersonIdDB = async (
  prismaTransaction: Prisma.TransactionClient,
  personId: string,
  data: Prisma.DivyangDetailsUpdateInput
) => {
  try {
    const result = await prismaTransaction.divyangDetails.update({
      where: {
        personId: personId,
      },
      data: data,
    });
    return result;
  } catch (error) {
    throwDatabaseError(error);
  }
};
export {
  updateDivyangDetailsDB,
  updateDisabilityOfDivyangDB,
  updateEducationQualificationOfDivyangDB,
  updateDivyangProfileKeyDB,
  divayangDetailsUpdateFileKeysDB,
  saveDisabilityDetailsCardKey,
  updateUDIDCardKeyDB,
  updateDisabilityDetailsCardKey,
  updateDivyangDetailsByPersonIdDB,
};

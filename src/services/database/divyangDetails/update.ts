import { Prisma } from "@prisma/client";
import { updateDivyangDetails } from "../../../types/divyangDetails/divyangDetailsSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { DisabilityOfDivyang } from "../../../types/divyangDetails/disabilityDetailsSchema.js";

const updateDivyangDetailsDB = async (
  prismaTransaction: Prisma.TransactionClient,
  divyangDetails: updateDivyangDetails,
  id: string
): Promise<updateDivyangDetails | undefined> => {
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
  const updatedDisabilityOfDivyang =
    await prismaTrasaction.disabilityOfDivyang.update({
      where: {
        id: id,
      },
      data: {
        divyang: {
          connect: { id: divyangId },
        },
        disabilityType: {
          connect: { id: disabilities.disabilityTypeId },
        },
        disabilityDueTo: disabilities.disabilityDueTo,
        disabilitySubType: {
          connect: { id: disabilities.disabilitySubTypeId },
        },
        isDisabilitySinceBirth: disabilities.isDisabilitySinceBirth,
        disabilitySince: disabilities.disabilitySince,
        disabilityArea: disabilities.disabilityArea,
        disabilityPercentage: disabilities.disabilityPercentage,
        certificateIssueAuthority: disabilities.certificateIssueAuthority,
        disabilityCardUrl: disabilities.disabilityCardUrl,
      },
    });
  return updatedDisabilityOfDivyang;
};
export { updateDivyangDetailsDB, updateDisabilityOfDivyangDB };

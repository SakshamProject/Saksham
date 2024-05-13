import { DivyangDetails, Prisma } from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import prisma from "../database.js";
import { createDivyangDetails } from "../../../types/divyangDetails/divyangDetailsSchema.js";
import { DisabilityOfDivyang } from "../../../types/divyangDetails/disabilityDetailsSchema.js";
import { auditLogSchemaType } from "../../../types/inputFieldSchema.js";

const createDivyangDetailsDB = async (
  divyangDetails: createDivyangDetails
): Promise<DivyangDetails | undefined> => {
  try {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      const createdDivyangDetails =
        await prismaTransaction.divyangDetails.create({
          data: divyangDetails,
        });
      const updatedDivyang = await prismaTransaction.divyangDetails.update({
        where: {
          id: createdDivyangDetails.id,
        },
          include: {
            person: true
          },
        data: {
          createdBy: {
            connect: {
              id: createdDivyangDetails.personId,
            },
          },
          updatedBy: {
            connect: {
              id: createdDivyangDetails.personId,
            },
          },
        },
      });
      return updatedDivyang;
    });

    return transaction;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throwDatabaseError(error);
    }
  }
};

const createDivyangDetailsAuditLogDB = async (
  prismaTransaction: Prisma.TransactionClient,
  auditLog: auditLogSchemaType,
  divyangDetailsId: string
) => {
  try {
    const divyangDetailsAuditLog =
      await prismaTransaction.divyangDetailsAuditLog.create({
        data: {
          divyangDetails: {
            connect: {
              id: divyangDetailsId,
            },
          },
          date: auditLog.date,
          description: auditLog.description,
          status: auditLog.status,
        },
      });
    return divyangDetailsAuditLog;
  } catch (error) {}
};

// const createDisabilityOfDivyangDB = async (
//   prismaTransaction: Prisma.TransactionClient,
//   disabilityOfDivyang: Prisma.DisabilityOfDivyangCreateInput
// ) => {
//   try {
//     const createdDisabilityOfDivyang =
//       await prismaTransaction.disabilityOfDivyang.create({
//         data: disabilityOfDivyang,
//       });
//     return createdDisabilityOfDivyang;
//   } catch (error) {
//     if (error instanceof Error) throwDatabaseError(error);
//   }
// };
export {
  createDivyangDetailsDB,
  createDivyangDetailsAuditLogDB,
  // createDisabilityOfDivyangDB,
};

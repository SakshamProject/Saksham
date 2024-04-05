import { Prisma } from "@prisma/client";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { getDisabilitySubTypeByDisabilityTypeIdDB } from "../read.js";
import { updateDisabilityTypeDB } from "../update.js";
import {
  getDisabilityTypeWithdisabilitySubTypeSchema,
  updateDisabilityTypeRequestSchemaType,
} from "../../../../../../types/typeMaster/generalMaster/disabilityType.js";
import { createUpdateDisabilityTypeObject } from "../../../../../../dto/typeMaster/generalMaster/disabilityType/put.js";
import {
  createCheckedDisabilitySubTypes,
  deleteUncheckedDisabilitySubTypes,
  retrieveDisabilitySubTypesId,
} from "../../../../../utils/typemaster/generalMaster/disabilityType.js";

async function putDisabilityTypeDBTransaction(
  body: updateDisabilityTypeRequestSchemaType,
  id:string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const updateDisabilityTypeObject = createUpdateDisabilityTypeObject(
          prismaTransaction,
          body,id
        );

        const updatedDisabilityType:
          | getDisabilityTypeWithdisabilitySubTypeSchema
          | undefined = await updateDisabilityTypeDB(
          prismaTransaction,
          updateDisabilityTypeObject,
          id
        );

        const exisitingDisabilitySubTypes =
          await getDisabilitySubTypeByDisabilityTypeIdDB(
            prismaTransaction,
            id
          );

        const exisitingDisabilitySubTypesId: string[] | undefined =
          retrieveDisabilitySubTypesId(exisitingDisabilitySubTypes);

        const services = body.disabilitySubType;

        const checkedDisabilitySubTypesId: string[] =
          await createCheckedDisabilitySubTypes(
            prismaTransaction,
            services,
            id
          );

        await deleteUncheckedDisabilitySubTypes(
          prismaTransaction,
          exisitingDisabilitySubTypesId,
          checkedDisabilitySubTypesId
        );

        return id;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 5000,
      timeout: 10000,
    }
  );
  return transaction;
}

export { putDisabilityTypeDBTransaction };

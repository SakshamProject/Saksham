import { Prisma } from "@prisma/client";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { createCheckedDisabilitySubTypes,  } from "../create.js";
import { getDisabilitySubTypeByDisabilityTypeIdDB} from "../read.js";
import { updateDisabilityTypeDB} from "../update.js";
import { getDisabilityTypeWithdisabilitySubTypeSchema, updateDisabilityTypeRequestSchemaType } from "../../../../../../types/typeMaster/generalMaster/disabilityType.js";
import { createUpdateDisabilityTypeObject } from "../../../../../../dto/typeMaster/generalMaster/disabilityType/put.js";
import { deleteUncheckedDisabilitySubTypes } from "../delete.js";
import { retrievedisabilitySubTypesId } from "../../../../../../controllers/typeMaster/generalMaster/disabilityType/put.js";

async function putDisabilityTypeDBTransaction(
  body: updateDisabilityTypeRequestSchemaType
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const updateDisabilityTypeObject = createUpdateDisabilityTypeObject(
          prismaTransaction,
          body
        );

        const updatedDisabilityType: getDisabilityTypeWithdisabilitySubTypeSchema | undefined =
          await updateDisabilityTypeDB(
            prismaTransaction,
            updateDisabilityTypeObject,
            body.id
          );

        const exisitingDisabilitySubTypes = await getDisabilitySubTypeByDisabilityTypeIdDB(
          prismaTransaction,
          body.id
        );

        const exisitingDisabilitySubTypesId: string[] | undefined =
          retrievedisabilitySubTypesId(exisitingDisabilitySubTypes);


        const services = body.disabilitySubType;

        const checkedDisabilitySubTypesId: string[] = await createCheckedDisabilitySubTypes(
          prismaTransaction,
          services,
          updatedDisabilityType?.id
        );

        await deleteUncheckedDisabilitySubTypes(
          prismaTransaction,
          exisitingDisabilitySubTypesId,
          checkedDisabilitySubTypesId
        );

        return updatedDisabilityType?.id;
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

import { DisabilitySubType, DisabilityType, Prisma } from "@prisma/client";
import {
  createPostDisabilitySubTypeDBObject,
  createPostDisabilityTypeDBObject,
} from "../../../../../../dto/typeMaster/generalMaster/disabilityType/post.js";
import { disabilityTypeRequestSchemaType } from "../../../../../../types/typeMaster/generalMaster/disabilityType.js";
import prisma from "../../../../database.js";
import {
  createDisabilitySubTypeDB,
  createDisabilityTypeDB,
} from "../create.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";

async function postDisabilityTypeDBTransaction(
  body: disabilityTypeRequestSchemaType
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const postDisabilityTypeDBObject = createPostDisabilityTypeDBObject(
          prismaTransaction,
          body
        );

        const disabilityType: DisabilityType | undefined =
          await createDisabilityTypeDB(
            prismaTransaction,
            postDisabilityTypeDBObject
          );

        for (let disabilitySubTypeName of body.disabilitySubType) {
          const postDisabilitySubTypeDBObject =
            createPostDisabilitySubTypeDBObject(
              disabilitySubTypeName,
              disabilityType?.id
            );

          const disabilitySubType: DisabilitySubType | undefined =
            await createDisabilitySubTypeDB(
              prismaTransaction,
              postDisabilitySubTypeDBObject
            );
        }

        return disabilityType?.id;
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

export { postDisabilityTypeDBTransaction };

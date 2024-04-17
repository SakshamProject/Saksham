import {
  DivyangServiceMapping,
  Donor,
  Prisma,
  StatusEnum,
} from "@prisma/client";
import {
  createPostDonorObject,
  createUpdateServiceMappingStoppedDBObject,
  createUpdateServiceMappingWithNonSevaKendraFollowUpDBObject,
  createUpdateServiceMappingWithSevaKendraFollowUpDBObject,
  createupdateServiceMappingCompletionDBObject,
} from "../../../../dto/serviceMapping/put.js";
import {
  donorSchemaType,
  postNonSevaKendraFollowUpType,
  putServiceMappingSchemaType,
} from "../../../../types/serviceMapping/serviceMappingSchema.js";
import prisma from "../../database.js";
import { createDonorDB, createNonSevaKendraFollowUpDB } from "../post.js";
import { updateServiceMappingDB } from "../put.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { createPostNonSevaKendraFollowUpDBObject } from "../../../../dto/serviceMapping/post.js";

async function putServiceMappingDBTransaction(
  body: putServiceMappingSchemaType,
  id: string,
  updatedById: string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {

        if (body.isCompleted === StatusEnum.COMPLETED) {
          if (body.donor) {
            const postDonorDBObject: donorSchemaType = createPostDonorObject(
              body.donor
            );
            const donor: Donor | undefined = await createDonorDB(
              prismaTransaction,
              postDonorDBObject
            );
            const updateServiceMappingDBObject =
              createupdateServiceMappingCompletionDBObject(
                body,
                updatedById,
                donor?.id
              );
            const serviceMapping = await updateServiceMappingDB(
              prismaTransaction,
              updateServiceMappingDBObject,
              id
            );
          } else {
            const updateServiceMappingDBObject =
              createupdateServiceMappingCompletionDBObject(body, updatedById);

            const serviceMapping = await updateServiceMappingDB(
              prismaTransaction,
              updateServiceMappingDBObject,
              id
            );
          }
        } else if ((body.isCompleted = StatusEnum.STOPPED)) {
          const updateServiceMappingDBObject =
            createUpdateServiceMappingStoppedDBObject(body, updatedById);
            
          const serviceMapping = updateServiceMappingDB(
            prismaTransaction,
            updateServiceMappingDBObject,
            id
          );
        } else if (body.isNonSevaKendraFollowUpRequired) {
          const updateServiceMappingDBObject =
            createUpdateServiceMappingWithNonSevaKendraFollowUpDBObject(
              body,
              updatedById
            );
          const serviceMapping: DivyangServiceMapping | undefined =
            await updateServiceMappingDB(
              prismaTransaction,
              updateServiceMappingDBObject,
              id
            );

          const postNonsevaKendraFollowUpDBObject:
            | postNonSevaKendraFollowUpType
            | undefined = createPostNonSevaKendraFollowUpDBObject(
            body,
            serviceMapping?.id
          );
          if (postNonsevaKendraFollowUpDBObject) {
            const nonSevaKendraFollowUp = await createNonSevaKendraFollowUpDB(
              prismaTransaction,
              postNonsevaKendraFollowUpDBObject
            );
          }

    
        }else{
          const serviceMappingDBObject = createUpdateServiceMappingWithSevaKendraFollowUpDBObject(body,updatedById);
          const serviceMapping = await updateServiceMappingDB(
            prismaTransaction,
            serviceMappingDBObject,
            id
          );

        }

  

        return id;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 50000,
      timeout: 50000,
    }
  );
  return transaction;
}

export { putServiceMappingDBTransaction };

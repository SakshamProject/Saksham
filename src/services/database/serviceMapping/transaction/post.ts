import throwDatabaseError from "../../utils/errorHandler.js";
import {
  createNonSevaKendraFollowUpDB,
  createServiceMappingDB,
} from "../post.js";
import defaults from "../../../../defaults.js";
import {
  postNonSevaKendraFollowUpType,
  postServiceMappingRequestSchemaType,
  postServiceMappingType,
} from "../../../../types/serviceMapping/serviceMappingSchema.js";
import prisma from "../../database.js";
import { DivyangServiceMapping, NonSevaKendraFollowUp } from "@prisma/client";
import {
  createPostNonSevaKendraFollowUpDBObject,
  createPostServiceMappingDBObject,
} from "../../../../dto/serviceMapping/post.js";

async function postServiceMappingDBTransaction(
  body: postServiceMappingRequestSchemaType,
  createdByID: string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const postServiceMappingDBObject: postServiceMappingType =
          createPostServiceMappingDBObject(body, createdByID);
        console.log(`[+]postServiceMappingDBObject`,postServiceMappingDBObject);

        const serviceMapping: DivyangServiceMapping | undefined =
          await createServiceMappingDB(
            prismaTransaction,
            postServiceMappingDBObject
          );
          console.log(`[+]serviceMapping`,serviceMapping)

        if (body.isNonSevaKendraFollowUpRequired) {

          const PostNonSevaKendraFollowUpDBObject: postNonSevaKendraFollowUpType =
            createPostNonSevaKendraFollowUpDBObject(body, serviceMapping?.id);
            console.log(`[+]PostNonSevaKendraFollowUpDBObject`,PostNonSevaKendraFollowUpDBObject)

          const NonSevaKendraFollowUp: NonSevaKendraFollowUp | undefined =
            await createNonSevaKendraFollowUpDB(
              prismaTransaction,
              PostNonSevaKendraFollowUpDBObject
            );
            console.log(`[+]NonSevaKendraFollowUp`,NonSevaKendraFollowUp)
        }

        return serviceMapping;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: defaults.transactionOptions.isolationLevel,
      maxWait: defaults.transactionOptions.maxWait,
      timeout: defaults.transactionOptions.timeout,
    }
  );
  return transaction;
}
export { postServiceMappingDBTransaction };

import throwDatabaseError from "../../utils/errorHandler.js";
import {
  createNonSevaKendraFollowUpDB,
  createServiceMappingDB,
  getDivyangIdFromPersonId,
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
  createdByPersonId: string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {

        let createdByDivyangId:string|undefined="";
        if(body.divyangId===undefined){
          const createdByDivyangIdObject = await getDivyangIdFromPersonId(prismaTransaction,createdByPersonId);
          createdByDivyangId = createdByDivyangIdObject?.divyang?.id
        }

        const postServiceMappingDBObject: postServiceMappingType =
          createPostServiceMappingDBObject(body, createdByPersonId,createdByDivyangId);



        const serviceMapping: DivyangServiceMapping | undefined =
          await createServiceMappingDB(
            prismaTransaction,
            postServiceMappingDBObject
          );


        if (body.isNonSevaKendraFollowUpRequired) {

          const PostNonSevaKendraFollowUpDBObject: postNonSevaKendraFollowUpType|undefined =
            createPostNonSevaKendraFollowUpDBObject(body, serviceMapping?.id);

          if(PostNonSevaKendraFollowUpDBObject){
            const NonSevaKendraFollowUp: NonSevaKendraFollowUp | undefined =
            await createNonSevaKendraFollowUpDB(
              prismaTransaction,
              PostNonSevaKendraFollowUpDBObject
            );
        }
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

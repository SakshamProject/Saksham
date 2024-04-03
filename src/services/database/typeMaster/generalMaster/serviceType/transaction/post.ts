import { Prisma, Service, ServiceType } from "@prisma/client";
import {
  createPostServiceDBObject,
  createPostServiceTypeDBObject,
} from "../../../../../../dto/typeMaster/generalMaster/serviceType/post.js";
import {
  postServiceType,
  serviceTypeRequestSchemaType,
} from "../../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../../database.js";
import { createServiceDB, createServiceTypeDB } from "../create.js";
import { getServiceTypeByIdDB } from "../read.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";

async function postServiceTypeDBTransaction(
  body: serviceTypeRequestSchemaType
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const postServiceTypeDBObject = createPostServiceTypeDBObject(prismaTransaction,body);

        const serviceType: ServiceType | undefined = await createServiceTypeDB(prismaTransaction,
          postServiceTypeDBObject
        );

        for (let serviceName of body.serviceName) {
          const postServiceDBObject: postServiceType =
            createPostServiceDBObject(prismaTransaction,serviceName, serviceType?.id);

          const service: Service | undefined = await createServiceDB(prismaTransaction,
            postServiceDBObject
          );
        }

        const result = await getServiceTypeByIdDB(prismaTransaction,serviceType?.id);
        return result;
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
export { postServiceTypeDBTransaction };

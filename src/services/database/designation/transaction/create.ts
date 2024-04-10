import { Designation, FeaturesOnDesignations, Prisma } from "@prisma/client";
import { postDesignationRequestSchemaType, postDesignationType, postFeaturesOnDesignationsType } from "../../../../types/designation/designationSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { createDesignationAuditLog, createPostDesignationDBObject, createPostFeaturesOnDesignationsDBObject } from "../../../../dto/designation/designation.js";
import { createDesignationDB ,createFeaturesOnDesignationDB} from "../create.js";

async function postDesignationDBTransaction(
  body: postDesignationRequestSchemaType,
  createdByID: string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const postDesignationDBObject :postDesignationType = createPostDesignationDBObject(body,createdByID);

        const designation: Designation | undefined = await createDesignationDB(
          prismaTransaction,
          postDesignationDBObject
        );

        for (let featureId of body.featuresId) {
          const PostFeaturesOnDesignationDBObject=
          createPostFeaturesOnDesignationsDBObject (
              designation?.id,
              featureId
            );

          const featuresOnDesignations: FeaturesOnDesignations | undefined = await createFeaturesOnDesignationDB(
            prismaTransaction,
            PostFeaturesOnDesignationDBObject
          );

          const DesignationAuditLog = createDesignationAuditLog(designation?.id,body.description)
        }

        return designation;
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
export { postDesignationDBTransaction };

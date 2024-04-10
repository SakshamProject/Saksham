import { Designation, FeaturesOnDesignations, Prisma } from "@prisma/client";
import { postDesignationRequestSchemaType, postDesignationType, postFeaturesOnDesignationsType } from "../../../../types/designation/designationSchema.js";
import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";
import { createDesignationAuditLog, createPostDesignationDBObject, createPostFeaturesOnDesignationsDBObject } from "../../../../dto/designation/designation.js";
import { createDesignationAuditLogDB, createDesignationDB ,createFeaturesOnDesignationDB} from "../create.js";

async function postDesignationDBTransaction(
  body: postDesignationRequestSchemaType,
  createdByID: string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const postDesignationDBObject :postDesignationType = createPostDesignationDBObject(body,createdByID);
        console.log(`[+]postDesignationDBObject`,postDesignationDBObject)

        const designation: Designation | undefined = await createDesignationDB(
          prismaTransaction,
          postDesignationDBObject
        );
        console.log(`[+]designation`,designation)


        for (let featureId of body.featuresId) {
          const PostFeaturesOnDesignationDBObject=
          createPostFeaturesOnDesignationsDBObject (
              designation?.id,
              featureId
            );
            console.log(`[+]PostFeaturesOnDesignationDBObject`,PostFeaturesOnDesignationDBObject)


          const featuresOnDesignations: FeaturesOnDesignations | undefined = await createFeaturesOnDesignationDB(
            prismaTransaction,
            PostFeaturesOnDesignationDBObject
          );
          console.log(`[+]featuresOnDesignations`,featuresOnDesignations)

        }
        const designationAuditLogObject = createDesignationAuditLog(designation?.id);
          const designationAuditLog = await createDesignationAuditLogDB(prismaTransaction,designationAuditLogObject);
          console.log(`[+]designationAuditLog`,designationAuditLog)

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

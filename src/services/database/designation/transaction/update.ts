import { Designation, FeaturesOnDesignations, Prisma } from "@prisma/client";
import throwDatabaseError from "../../utils/errorHandler.js";
import { updateDesignationRequestSchemaType } from "../../../../types/designation/designationSchema.js";
import prisma from "../../database.js";
import { createUpdateDesignationObject } from "../../../../dto/designation/designation.js";
import { updateDesignationDB } from "../update.js";
import { getFeaturesIdByDesignationIdDB } from "../read.js";
import { createCheckedFeaturesOnDesignations, deleteUncheckedDesignations, retrieveFeatureIds } from "../../../utils/designation/designation.js";

async function putDesignationDBTransaction(
    body: updateDesignationRequestSchemaType,
    id:string,
    updatedById:string|undefined
  ) {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        try {
          const updateDesignationObject = createUpdateDesignationObject(
            body,
            updatedById
          );
          console.log("[+]updateDesignationObject",updateDesignationObject)
  
          const updatedDesignation:
            | Designation
            | undefined = await updateDesignationDB(
            prismaTransaction,
            updateDesignationObject,
            id
          );
          console.log("[+]updatedDesignation",updatedDesignation)

          //have to include the update record in audit log which uses `updatedById`

          const exisitingFeatures=
            await getFeaturesIdByDesignationIdDB(
              prismaTransaction,
              id
            );
            console.log("[+]exisitingFeatures",exisitingFeatures)


            const checkedfeatures= body.features;

          const {existingFeaturesId,checkedFeaturesId}= retrieveFeatureIds(exisitingFeatures,checkedfeatures);

          console.log("[+]existingFeaturesId",existingFeaturesId)
          console.log("[+]checkedFeaturesId",checkedFeaturesId)

  
      
  
            await createCheckedFeaturesOnDesignations(
              prismaTransaction,
              checkedFeaturesId,
              existingFeaturesId,
              id,
              updatedById
            );
  
          await deleteUncheckedDesignations(
            prismaTransaction,
            existingFeaturesId,
            checkedFeaturesId,
            id
          );
  
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
  
  export { putDesignationDBTransaction };